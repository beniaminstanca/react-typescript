import { useLoaderData, json } from "react-router-dom";
import TasksList from "../components/events/TasksList";

function TasksPage() {
  const data = useLoaderData() as any;
  const tasks = data.tasks;
  return <TasksList tasks={tasks} />;
}

export default TasksPage;

export async function loader() {
  const response = await fetch("http://localhost:8080/tasks");

  if (!response.ok) {
    throw json({ message: "Could not fetch tasks" }, { status: 500 });
  } else {
    return response;
  }
}
