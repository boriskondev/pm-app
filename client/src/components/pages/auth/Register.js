import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import { useState, useContext } from "react";
import "./Register.css";
import endpoints from "../../../services/api";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import setAndUnsetError from "../../../utils/setAndUnsetError";

const Register = () => {
  const history = useHistory();
  const { getLoggedIn } = useContext(AuthContext);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [state, setState] = useState({
    username: "",
    department: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const timeoutLength = 1500;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !state.username ||
      !state.department ||
      !state.email ||
      !state.password ||
      !state.repeatPassword
    ) {
      setAndUnsetError(setError, "All fields are required.", timeoutLength);
      return;
    }

    if (state.password !== state.repeatPassword) {
      setAndUnsetError(setError, "Passwords do not match.", timeoutLength);
      return;
    }

    const { username, department, email, password, repeatPassword } = state;

    const newUserToAdd = {
      username,
      department,
      email,
      password,
      repeatPassword,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserToAdd),
      credentials: "include",
    };

    try {
      const registerResponse = await fetch(endpoints.REGISTER, requestOptions);

      let message = null;

      if (registerResponse.status === 400)
        message = "Enter all required fields.";
      else if (registerResponse.status === 406)
        message = "This email is already registered.";
      else if (registerResponse.status === 418)
        message = "Passwords do not match.";

      if (message) {
        setAndUnsetError(setError, message, timeoutLength);
        return;
      }

      setSubmitted("User registered successfully.");

      setTimeout(() => {
        getLoggedIn();
        history.push("/");
      }, 1500);
    } catch (error) {
      console.log(error);
      setAndUnsetError(setError, "You cannot register now.", timeoutLength);
      // return;
    }
  };

  return (
    <>
      <Header title="Registration" />

      <section className="form-wrapper">
        <form className="register" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              id="username"
              value={state.username}
              onChange={handleFieldChange}
              autoComplete="off"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>Department</label>
            <select
              id="department"
              value={state.department}
              onChange={handleFieldChange}
              autoComplete="off"
            >
              <option hidden>Choose department</option>
              <option value="clientService">Client service department</option>
              <option value="creative">Creative department</option>
              <option value="management">Management department</option>
            </select>
          </div>

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

          <div className="form-field">
            <label>Repeat password</label>
            <input
              type="password"
              id="repeatPassword"
              value={state.repeatPassword}
              onChange={handleFieldChange}
              autoComplete="off"
            />
          </div>

          <Notifications submitted={submitted} error={error} />

          <button className="add" type="submit">
            Submit
          </button>

          <p>
            You already have an account? Enter <Link to="/login">here.</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
