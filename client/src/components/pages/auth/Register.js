import Header from "../../common/Header";
import {useState, useContext} from "react";
import "./Register.css";
import endpoints from "../../../services/api";
import {Link, useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const Register = () => {
    const history = useHistory();
    const {getLoggedIn} = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [state, setState] = useState({
        username: "",
        department: "",
        email: "",
        password: "",
        repeatPassword: "",
    })

    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.username || !state.department || !state.email ||
            !state.password || !state.repeatPassword) {
            setError("All fields are required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        if (state.password !== state.repeatPassword) {
            setError("Passwords do not match.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const {username, department, email, password, repeatPassword} = state;

        const newUserToAdd = {
            username,
            department,
            email,
            password,
            repeatPassword
        };

        const allUsersInDb = await fetchWrapper.get(endpoints.USERS);

        for (let user of allUsersInDb) {
            if (user.email === email) {
                setError("This user is already registered.")
                setTimeout(() => {
                    setError(false);
                }, 1500);
                return;
            }
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUserToAdd),
            credentials: "include"
        };

        fetch(endpoints.REGISTER, requestOptions)
            .then(() => {
                setSubmitted("User registered successfully.")
                setTimeout(() => {
                    getLoggedIn()
                    history.push("/")
                }, 1500);
            })
            .catch(err => console.log("In catch" + err));
    }

    return (
        <>
            <Header title="Registration"/>

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
                    {submitted && (<span className="success">{submitted}</span>)}
                    {error && (<span className="error">{error}</span>)}
                </div>

                <button className="add" type="submit">Submit</button>

                <p>You already have an account? Enter <Link to="/login">here.</Link></p>

            </form>
        </>
    )
}

export default Register;