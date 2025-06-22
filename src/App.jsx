import { useState } from "react";
import "./App.css";
import ProductsTable from "./components/products/productsTable";
import TaskOne from "./task1/task1";
import TaskTwo from "./task2/task2";
import CommonButton from "./components/commonButton/commonButton";

function App() {
  const [selectedTab, setSelectedTab] = useState("task1");
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const taskButtons = [
    { label: "Task 1", value: "task1" },
    { label: "Task 2", value: "task2" },
    { label: "Task 3", value: "task3" },
    { label: "Task 4", value: "task4" },
  ];

  return (
    <>
      <div className="flex flex-col gap-1 p-2 leading-0">
        <span className="text-9xl font-bold text-white">EduNXT</span>
        <span className="text-lg font-bold text-white  pl-2">
          React Table Components & Laravel Blade Conversion
        </span>
      </div>
      <div className="pl-4 flex gap-3 mb-2">
        {taskButtons.map((button) => (
          <CommonButton
            label={button.label}
            key={button.value}
            value={button.value}
            onClick={() => handleTabChange(button.value)}
            isSelected={selectedTab}
          />
        ))}
      </div>
      <hr className="mb-2" />
      <div>
        {selectedTab === "task1" && <TaskOne />}
        {selectedTab === "task2" && <TaskTwo />}
        {/* Add other tasks here as needed */}
      </div>
      {/* <ProductsTable /> */}
    </>
  );
}

export default App;
