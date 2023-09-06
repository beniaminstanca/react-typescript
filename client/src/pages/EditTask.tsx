import { useRouteLoaderData } from "react-router-dom";
import TaskForm from "../components/tasks/TaskForm";
import { TaskDetail} from '../models/types';

function EditTaskPage (){
    //const data:any = useRouteLoaderData('task-detail');
    const {task} = useRouteLoaderData('task-detail') as TaskDetail;
   // const task = data.task
    return <TaskForm task={task} method={'PATCH'}/>
}

export default EditTaskPage;