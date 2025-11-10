import NumberCarousel from "../components/Carousel";
import { LuDot } from "react-icons/lu";

const Home =()=>{
    return(
        <div className="flex flex-col justify-center items-center">
            <div>
                <img className="rounded-[50%] w-[114px]" src="https://avatars.githubusercontent.com/u/103905242?v=4" alt="assets" />
            </div>
            <div className="text-center">
                <h1 className="font-bold md:leading-14 leading-8 md:text-[56px] text-[28px] mt-6">Hi, I'm Akare Agwom.<br/> Frontend Developer</h1>
                <h3 className="text-gray-600 mt-4 flex-wrap md:px-0 px-4">Relentless self-taught developer, passionate about crafting Next.js solutions,<br/>and driven to grow in tech.</h3>
            </div>
            <div className="flex gap-4 py-4">
                <button className="bg-black text-white rounded-[10px] w-[100px] p-2">Hire Me!</button>
                <div className=" bg-[#E1F9DC]  flex gap-2 items-center justify-center text-[#178D00] rounded-full border-1 w-[250px] text-center border-lime-500 p-2">
                    <LuDot width="34"/>
                    <p>Ready to Collaborate</p>
                </div>
            </div>
            <div className="">
                <NumberCarousel/>
            </div>
        </div>
    )
}

export default Home;