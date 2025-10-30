import React, { useEffect, useRef, useState } from "react";

type NumberCarouselProps = {
  numbers?: number[]; // items to show (defaults to 0..9)
  visible?: number; // how many numbers visible at once
  interval?: number; // ms between moves
  pauseOnHover?: boolean;
};

export default function NumberCarousel({
  numbers = Array.from({ length: 10 }, (_, i) => i),
  visible = 3,
  interval = 1500,
  pauseOnHover = true,
}: NumberCarouselProps) {
  const [index, setIndex] = useState(0); // current slide index (0..n)
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const transitionRef = useRef(true);

  // We'll clone the first `visible` items at the end so the loop looks seamless
  const list = [...numbers, ...numbers.slice(0, visible)];
  const realLength = numbers.length;

  // measure a slide width
  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const slide = trackRef.current.querySelector("[data-slide]") as HTMLElement | null;
      if (!slide) return;
      setSlideWidth(slide.offsetWidth);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // autoplay
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => {
      // increment index
      setIndex((i) => i + 1);
    }, interval);
    return () => clearInterval(t);
  }, [isPaused, interval]);

  // when we move to the cloned area (index >= realLength) we'll snap back to 0
  useEffect(() => {
    if (index === 0) return;

    // if we've reached the clone point, after transition end we'll snap back to 0
    if (index >= realLength) {
      // after the CSS transition completes we need to jump to index 0 without transition
      const onTransitionEnd = () => {
        transitionRef.current = false; // temporarily disable transition
        setIndex(0);
        // re-enable transition on the next tick
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            transitionRef.current = true;
          });
        });
      };

      const el = trackRef.current;
      el?.addEventListener("transitionend", onTransitionEnd, { once: true });

      // cleanup if unmounted mid-transition
      return () => el?.removeEventListener("transitionend", onTransitionEnd);
    }
  }, [index, realLength]);

  // manual nav
  const prev = () => {
    setIndex((i) => (i - 1 + realLength) % realLength);
  };
  const next = () => {
    setIndex((i) => i + 1);
  };

  // compute transform
  const translateX = -index * slideWidth;

  return (
    <div
      className="w-full max-w-xl mx-auto p-4"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative">
        {/* viewport */}
        <div className="overflow-hidden">
          {/* track */}
          <div
            ref={trackRef}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: transitionRef.current ? "transform 400ms ease" : "none",
            }}
            className="flex items-center"
          >
            {list.map((n, idx) => (
              <div
                key={idx}
                data-slide
                className={`flex-shrink-0 flex items-center justify-center h-24 md:h-28 lg:h-32 px-4 md:px-6 border rounded-lg mr-3 bg-white/80 dark:bg-gray-800/70 shadow-sm`}
                style={{ minWidth: `${100 / visible}%` }}
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">{n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
          <button
            onClick={prev}
            className="pointer-events-auto ml-1 p-2 rounded-full bg-white/90 dark:bg-gray-900/70 shadow hover:scale-105 transition-transform"
            aria-label="Previous"
          >
            ‹
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
          <button
            onClick={next}
            className="pointer-events-auto mr-1 p-2 rounded-full bg-white/90 dark:bg-gray-900/70 shadow hover:scale-105 transition-transform"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      {/* dots / indicator */}
      <div className="mt-3 flex justify-center gap-2">
        {numbers.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              index % realLength === i ? "bg-gray-900 dark:bg-white" : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
