import { Form, Link, useSearchParams, useActionData } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data: any = useActionData();
  const [seachParams] = useSearchParams();
  const isLogin = seachParams.get("mode") === "login";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err: any) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {data && data.message && <p>{data.message}</p>}
        {!isLogin && (
          <>
            <p>
              <label htmlFor="fname">First Name</label>
              <input id="fname" type="text" name="fname" required />
            </p>
            <p>
              <label htmlFor="lname">Last Name</label>
              <input id="lname" type="text" name="lname" required />
            </p>
          </>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        {/* <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p> */}
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            <button>{isLogin ? "Register now" : "Login"}</button>
          </Link>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
