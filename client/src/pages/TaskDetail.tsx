import { useRouteLoaderData, json, redirect } from "react-router-dom";
import TaskItem from "../components/tasks/TaskItem";
import { getAuthToken } from "../util/auth";
import { TaskDetail} from '../models/types';


function TaskDetailPage() {
  const {task} = useRouteLoaderData('task-detail') as TaskDetail;

  return (
    <>
      <TaskItem task={task} />
    </>
  );
}

export default TaskDetailPage;

type MyParams = {
  eventId : string;
}

export async function loader({ request, params}:{request:Request, params: MyParams}) {
  const id = params.eventId;
  const response = await fetch(
    "http://localhost:8080/tasks/" + id
  );

  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected task" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action ({params, request}:{params:any, request:Request}) {
  const taskId = params.eventId;
  const token = getAuthToken();
  const response = await fetch(
    "http://localhost:8080/tasks/" + taskId, {
      method: request.method,
      headers:{
        'Authorization' : 'Bearer ' + token
      }
    });
    if (!response.ok) {
      throw json({ message: "Could not delete task" }, { status: 500 });
    } 
    return redirect('/tasks');
}