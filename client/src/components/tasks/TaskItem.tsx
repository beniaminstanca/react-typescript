import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./TaskItem.module.css";

const TaskItem: React.FC<{ task: any }> = ({ task }) => {
  const token = useRouteLoaderData("root") as any;
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <article className={classes.event}>
      <h1>{task.title}</h1>
      <time>{task.date}</time>
      <p>{task.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
};

export default TaskItem;
