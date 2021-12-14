import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import { useState, useContext } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import setAndUnsetError from "../../../utils/setAndUnsetError";

const Login = () => {
  const history = useHistory();

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { getLoggedIn } = useContext(AuthContext);

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const timeoutLength = 1500;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.email || !state.password) {
      setAndUnsetError(setError, "All fields are required.", timeoutLength);
      return;
    }

    const { email, password } = state;

    const userToLogin = {
      email,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userToLogin),
      credentials: "include",
    };

    try {
      const loginResponse = await fetch(endpoints.LOGIN, requestOptions);

      let message = null;

      if (loginResponse.status === 400) message = "Enter all required fields.";
      else if (loginResponse.status === 401) message = "Wrong password.";
      else if (loginResponse.status === 404) message = "User does not exist.";

      if (message) {
        setAndUnsetError(setError, message, timeoutLength);
        return;
      }

      setSubmitted("User logged in successfully.");

      setTimeout(() => {
        getLoggedIn();
        history.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setAndUnsetError(setError, "You cannot login now.", timeoutLength);
      // return;
    }
  };

  return (
    <>
      <Header title="Log in" />

      <section className="form-wrapper">
        <form className="login" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              id="email"
              value={state.email}
              onChange={handleFieldChange}
              autoComplete="off"
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              id="password"
              value={state.password}
              onChange={handleFieldChange}
              autoComplete="off"
            />
          </div>

          <Notifications submitted={submitted} error={error} />

          <button className="add" type="submit">
            Submit
          </button>

          <p>
            You don't have an account? Register{" "}
            <Link to="/register">here.</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
