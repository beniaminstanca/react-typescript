import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import TasksPage, { loader as tasksLoader } from "./pages/Tasks";
import TaskDetailPage, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from "./pages/TaskDetail";
import NewTaskPage from "./pages/NewTask";
import EditTaskPage from "./pages/EditTask";
import TasksRootLayout from "./pages/TasksRoot";
import { action as manipulateTaskAction } from "./components/tasks/TaskForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { loader as tokenLoader } from "./util/auth";
import {ckeckAuthLoader} from './util/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id:'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "tasks",
        element: <TasksRootLayout />,
        children: [
          {
            index: true,
            element: <TasksPage />,
            loader: tasksLoader,
          },
          {
            path: ":eventId",
            id: "task-detail",
            loader: taskDetailLoader as any,
            children: [
              {
                index: true,
                element: <TaskDetailPage />,
                action: deleteTaskAction,
              },
              {
                path: "edit",
                element: <EditTaskPage />,
                action: manipulateTaskAction,
                loader: ckeckAuthLoader
              },
            ],
          },
          {
            path: "new",
            element: <NewTaskPage />,
            action: manipulateTaskAction,
            loader: ckeckAuthLoader
          },
        ],
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
