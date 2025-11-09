import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiNextdotjs,
  SiWebpack,
} from "react-icons/si";

type IconCarouselProps = {
  visible?: number;
  interval?: number;
  pauseOnHover?: boolean;
};

export default function IconCarousel({
  visible = 3,
  interval = 1500,
  pauseOnHover = true,
}: IconCarouselProps) {
  const icons = [
    { id: "react", Icon: FaReact, label: "React" },
    { id: "tailwind", Icon: SiTailwindcss, label: "Tailwind" },
    { id: "typescript", Icon: SiTypescript, label: "TypeScript" },
    { id: "vite", Icon: SiVite, label: "Vite" },
    { id: "nextjs", Icon: SiNextdotjs, label: "Next.js" },
    { id: "webpack", Icon: SiWebpack, label: "Webpack" },
    { id: "html5", Icon: FaHtml5, label: "HTML5" },
    { id: "css3", Icon: FaCss3Alt, label: "CSS3" },
    { id: "javascript", Icon: FaJsSquare, label: "JavaScript" },
  ];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const transitionRef = useRef(true);

  const list = [...icons, ...icons.slice(0, visible)];
  const realLength = icons.length;

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

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setIndex((i) => i + 1), interval);
    return () => clearInterval(t);
  }, [isPaused, interval]);

  useEffect(() => {
    if (index === 0) return;
    if (index >= realLength) {
      const onTransitionEnd = () => {
        transitionRef.current = false;
        setIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            transitionRef.current = true;
          });
        });
      };
      const el = trackRef.current;
      el?.addEventListener("transitionend", onTransitionEnd, { once: true });
      return () => el?.removeEventListener("transitionend", onTransitionEnd);
    }
  }, [index, realLength]);

  const translateX = -index * slideWidth;

  return (
    <div
      className="w-full max-w-xl mx-auto p-4"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div className="relative">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: transitionRef.current ? "transform 400ms ease" : "none",
            }}
            className="flex items-center"
          >
            {list.map((item, idx) => (
              <div
                key={idx}
                data-slide
                className="flex-shrink-0 flex flex-col items-center justify-center h-16 md:h-18 lg:h-24 px-4 md:px-6 mr-3 bg-white/80  shadow-sm hover:scale-105 transition-transform"
                style={{ minWidth: `${100 / visible}%` }}
              >
                <item.Icon className="text-4xl md:text-5xl lg:text-6xl mb-2" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
