import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

import classes from "./TaskForm.module.css";
import { getAuthToken } from "../../util/auth";

const TaskForm: React.FC<{ method: any; task: any }> = ({
  method,
  task,
}) => {
  const data: any = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err: any) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={task ? task.title : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={task ? task.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          defaultValue={task ? task.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default TaskForm;

//   type MyParams = {
//     eventId : any;
//   }

export async function action({
  request,
  params,
}: {
  request: Request;
  params: any;
}) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const taskData = {
    title: data.get("title"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/tasks/";
  if (method === "PATCH") {
    url = "http://localhost:8080/tasks/" + params.eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      'Authorization' : 'Bearer ' + token
    },
    body: JSON.stringify(taskData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save data in database" }, { status: 500 });
  }

  return redirect("/tasks");
}
