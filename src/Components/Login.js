import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./../assets/css/loginSignup.css";
import { useHistory } from "react-router-dom";
import { login } from "../thunks/user-action";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [enteredUsername, usernameChangeHandler] = useState("");
  const [enteredPassword, passwordChangeHandler] = useState("");
  const [showStrMsg, handleShowMsg] = useState(false);

  useEffect(() => {}, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(login(enteredUsername, enteredPassword)).then(() => {
      if (sessionStorage.userSession) {
        history.push("/index");
      } else {
        handleShowMsg(true);
      }
    });
  };

  const goToSignup = () => {
    history.push("/signup");
  };

  const handleClose = () => {
    handleShowMsg(false);
  };

  useEffect(() => {
    window.setTimeout(() => {
      handleShowMsg(false);
    }, 3000);
  }, [showStrMsg]);

  return (
    <Fragment>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form
              id="form-singin"
              name="form-singin"
              onSubmit={formSubmitHandler}
            >
              {showStrMsg ? (
                <div className="alert alert-danger">
                  The username or password is incorrect
                  <button className="close" onClick={handleClose}>
                    x
                  </button>
                </div>
              ) : (
                <div></div>
              )}
              <h3>Sign In</h3>

              <div className="form-group">
                <label>User name</label>
                <input
                  id="userName"
                  type="text"
                  className="form-control"
                  placeholder="User name"
                  onChange={(event) =>
                    usernameChangeHandler(event.target.value)
                  }
                  value={enteredUsername || ""}
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
                  onChange={(event) =>
                    passwordChangeHandler(event.target.value)
                  }
                  value={enteredPassword || ""}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-block">
                Submit
              </button>
              <p className="forgot-password text-right">
                Not registered yet
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={goToSignup}
                >
                  sign up?
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
