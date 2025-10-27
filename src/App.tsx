
// import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
 

  return (
    <div className="mx-[300px] shadow">
      <div className="flex justify-center items-center py-4 ">
        <Navbar />
      </div>
      <div className="pt-[150px]">
        <Home/>
      </div>
    </div>
  );
}

export default App;
