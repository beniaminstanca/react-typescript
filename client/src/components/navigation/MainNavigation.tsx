import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import Button from "../button/Button";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token: any = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Tasks
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="POST">
                {/* <button>Logout</button> */}
                <Button>Logout</Button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
