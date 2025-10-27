import { LuGithub } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="bg-[#000000D9] shadow-md fixed z-50 top-4 flex justify-center flex-col items-center w-[40%] rounded-full text-white p-2">
      <div className="flex gap-6 items-center justify-center w-full">
        <h1>LOGO</h1>
        <ul className="flex gap-6">
          <li>
            <a href="http://">Home</a>
          </li>
          <li>
            <a href="http://">Projects</a>
          </li>
          <li>
            <a href="http://">Experience</a>
          </li>
        </ul>
        <div className="flex gap-6 text-2xl ">
            <a href="http://github.com/akareagwom">
                <LuGithub />
            </a>
            <div className="">
                <IoDocumentTextOutline />
            </div>
        </div>
        <div className=" border-l-1 border-white pl-2">
        <button className="p-2 bg-white text-black rounded">Contacts</button>

        </div>
      </div>
    </div>
  );
};
export default Navbar;
