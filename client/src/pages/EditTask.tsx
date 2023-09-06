import { useRouteLoaderData } from "react-router-dom";
import TaskForm from "../components/events/TaskForm";

function EditTaskPage (){
    const data:any = useRouteLoaderData('task-detail');
    const task = data.task
    return <TaskForm task={task} method={'PATCH'}/>
}

export default EditTaskPage;