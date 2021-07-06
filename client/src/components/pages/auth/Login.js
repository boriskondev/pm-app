import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import {useState} from "react";
import "./Register.css";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
    const history = useHistory();

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const {getLoggedIn} = useContext(AuthContext);

    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    const setAndUnsetError = (message, time) => {
        setError(message)
        setTimeout(() => {
            setError(false);
        }, time);
    }

    const timeoutLength = 1500;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.email || !state.password) {
            setError("All fields are required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const {email, password} = state;

        const userToLogin = {
            email,
            password
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userToLogin),
            credentials: "include"
        };

        const loginResponse = await fetch(endpoints.LOGIN, requestOptions);

        if (loginResponse.status === 400) {
            setAndUnsetError("Email or password is missing.", timeoutLength);
            return;
        } else if (loginResponse.status === 401) {
            setAndUnsetError("Wrong password.", timeoutLength);
            return;
        } else if (loginResponse.status === 404) {
            setAndUnsetError("User does not exist.", timeoutLength);
            return;
        }
    }

    return (
        <>
            <Header title="Log in"/>

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

                    <Notifications submitted={submitted} error={error}/>

                    <button className="add" type="submit">Submit</button>

                    <p>You don't have an account? Register <Link to="/register">here.</Link></p>

                </form>
            </section>
        </>
    )
}

export default Login;