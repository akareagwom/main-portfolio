import info from "../data/info.json";

const Projects = () => {
  return (
    <div className="flex justify-between p-12">
      {info.map((item, index) => (
        <div key={index} className="flex flex-col w-[200px] shadow-sm rounded justify-center p-2">
          <div className="bg-gray-300 rounded  p-2 ">
            <img
              src="https://images.unsplash.com/photo-1533167649158-6d508895b680?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNwbGFzaHxlbnwwfHwwfHx8MA%3D%3D"
              alt="asset"
            />
          </div>
          <div className="">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Projects;