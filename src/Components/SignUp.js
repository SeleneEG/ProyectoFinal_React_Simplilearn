import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./../assets/css/loginSignup.css";
import { useHistory } from "react-router-dom";
import { singup } from "../thunks/user-action";

function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [enteredUsername, usernameChangeHandler] = useState("");
  const [enteredEmail, emailChangeHandler] = useState("");
  const [enteredPassword, passwordChangeHandler] = useState("");

  const goToLogin = () => {
    history.push("/");
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    let payload = {
      userName: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    dispatch(singup(payload));
    history.push("/");
  };

  return (
    <Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form
            id="form-singup"
            name="form-singup"
            onSubmit={formSubmitHandler}
          >
            <h3>Sign Up</h3>
            <div className="form-group">
              <label>User name</label>
              <input
                id="userName"
                type="text"
                className="form-control"
                placeholder="User name"
                onChange={(event) => usernameChangeHandler(event.target.value)}
                value={enteredUsername || ""}
                required
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => emailChangeHandler(event.target.value)}
                value={enteredEmail || ""}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => passwordChangeHandler(event.target.value)}
                value={enteredPassword || ""}
                required
              />
            </div>

            <button type="submit" className="btn btn-success btn-block">
              Sign Up
            </button>
            <p className="forgot-password text-right">
              Already registered
              <button
                type="button"
                className="btn btn-link"
                onClick={goToLogin}
              >
                sign in?
              </button>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
