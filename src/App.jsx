import { Route, Routes } from "react-router-dom";
import "./App.css";
import AllTasks from "./components/allTasks/allTasks";
import AnalyticsDashboard from "./components/laravelMigrationComponents/AnalyticsDashboard";
import TaskOne from "./task1/task1";
import TaskTwo from "./task2/task2";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllTasks />} />
        <Route path="/task1" element={<TaskOne />} />
        <Route path="/task2" element={<TaskTwo />} />
        <Route path="/task3" element={<AnalyticsDashboard />} />
      </Routes>
    </>
  );
}

export default App;
