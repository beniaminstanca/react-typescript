import { Outlet } from "react-router-dom";
import TasksNavigation from "../components/navigation/TasksNavigation"

function TasksRootLayout() {
  return (
    <>
      <TasksNavigation />
      <Outlet />
    </>
  );
}

export default TasksRootLayout;
