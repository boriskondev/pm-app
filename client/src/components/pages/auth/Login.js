import Header from "../../common/Header";
import {useState} from "react";
import "./Register.css";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const Login = () => {
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);
    const [state, setState] = useState({
        email: "",
        password: ""
    })

    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = state;

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

        fetch(endpoints.LOGIN, requestOptions)
            .then(res => res)
            .then(() => getLoggedIn())
            .then(() => {
                history.push("/")
            })
            .catch(err => console.log("In catch" + err))
    }

    return (
        <>
            <Header title="Log in"/>

            <form className="login" onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={state.email}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
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
                        required
                    />
                </div>

                <button className="add" type="submit">Submit</button>

                <p>You don't have an account? Register <Link to="/register">here.</Link></p>

            </form>
        </>
    )
}

export default Login;