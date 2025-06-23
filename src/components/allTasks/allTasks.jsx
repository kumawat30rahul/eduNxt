import { useNavigate } from "react-router-dom";

const AllTasks = () => {
  const navigate = useNavigate();
  const taskButtons = [
    {
      label: "Task 1",
      value: "task1",
      route: "/task1",
      description: "Basic Reusable Table Component",
    },
    {
      label: "Task 2",
      value: "task2",
      route: "/task2",
      description: "Advanced Table with Additional Features",
    },
    {
      label: "Task 3",
      value: "task3",
      route: "task3",
      description: "Laravel Blade to React Conversion",
    },
    {
      label: "Task 4",
      value: "task4",
      route: "https://edunxt-task-4.vercel.app/",
      description: "Beautiful Modern Dashboard Creation",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-1 p-2 leading-0">
        <span className="text-9xl font-bold text-white">EduNXT</span>
        <span className="text-lg font-bold text-white  pl-2">
          React Table Components & Laravel Blade Conversion
        </span>
      </div>
      <div className="flex pl-1 flex-col sm:flex-row sm:w-full">
        {taskButtons?.map((item) => (
          <div
            className={`w-80 h-80 m-3 rounded-xl cursor-pointer transition-all duration-300
        backdrop-blur-md bg-white/10 border border-white/20 shadow-lg
        flex flex-col justify-between p-4
        hover:bg-white/20 hover:shadow-xl hover:scale-101`}
            onClick={() => {
              if (item.value === "task4") {
                return window.open(item.route, "_blank");
              }
              navigate(item.route);
            }}
          >
            <div>
              <h2 className="text-xl font-semibold text-white">
                {item?.label}
              </h2>
              <span>{item?.componentName}</span>
            </div>
            <p className="text-sm text-gray-200">{item?.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 pl-5">
        <span className="text-2xl font-bold">Note</span>
        <ul className="list-disc">
          <li className="ml-5">Click on task to get to that task</li>
          <li className="ml-5">
            Task 4 has been created as seperate react app
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllTasks;
