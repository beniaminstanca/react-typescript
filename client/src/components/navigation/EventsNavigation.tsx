import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  const token = useRouteLoaderData('root') as any;
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              All Tasks
            </NavLink>
          </li>
          {token && <li>
            <NavLink
              to="new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Task
            </NavLink>
          </li>}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
