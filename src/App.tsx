
// import "./App.css";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

function App() {
 

  return (
    <div className="mx-[300px] shadow">
      <div className="flex justify-center items-center py-4 ">
        <Navbar />
      </div>
      <div className="pt-[150px]">
        <Home/>
      </div>
      <div className="">
        {/* about section */}
        <About/>
      </div>
      <div className="">
        <Projects/>
      </div>
    </div>
  );
}

export default App;
