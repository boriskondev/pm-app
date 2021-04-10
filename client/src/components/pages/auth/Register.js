import Header from "../../common/Header";
import {useState} from "react";
import "./Register.css";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";

const Register = () => {
    const history = useHistory();
    const { getLoggedIn } = useContext(AuthContext);
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

        const { username, department, email, password, repeatPassword } = state;

        const newUserToAdd = {
            username,
            department,
            email,
            password,
            repeatPassword
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUserToAdd),
            credentials: "include"
        };

        fetch(endpoints.REGISTER, requestOptions)
            .then(res => res)
            .then(() => getLoggedIn())
            .then(() => {
                history.push("/")
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
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Department</label>
                    <select
                        id="department"
                        value={state.department}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
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

                <div className="form-field">
                    <label>Repeat password</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={state.repeatPassword}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
                    />
                </div>


                <button className="add" type="submit">Submit</button>

                <p>You already have an account? Enter <Link to="/login">here.</Link></p>

            </form>
        </>
    )
}

export default Register;