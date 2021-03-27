import Header from "../../common/Header";
import {useState} from "react";
import "./Register.css";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import { useHistory } from "react-router-dom";

// https://medium.com/technoetics/create-basic-login-forms-using-react-js-hooks-and-bootstrap-2ae36c15e551

const Register = () => {
    const [state, setState] = useState({
        username: "",
        department: "",
        email: "",
        password: "",
        repeatPassword: "",
    })
    const history = useHistory();

    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, department, email, password } = state;

        const newUserToAdd = {
            username,
            department,
            email,
            password
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newUserToAdd)
        };

        fetch(endpoints.USERS, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .then(() => {
                history.push("/")
            })

        //Some stuff to be set after submitting the new task.
    }

    return (
        <>
            <Header title="Регистрация"/>

            <form className="register" onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Име</label>
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
                    <label>Отдел</label>
                    <select
                        id="department"
                        value={state.department}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
                    >
                        <option hidden>Избери</option>
                        <option value="clientService">Акаунт отдел</option>
                        <option value="creative">Творчески отдел</option>
                        <option value="management">Мениджмънт</option>
                    </select>
                </div>

                <div className="form-field">
                    <label>Имейл</label>
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
                    <label>Парола</label>
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
                    <label>Повтори парола</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={state.repeatPassword}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
                    />
                </div>


                <button className="add" type="submit">Добави</button>

                <p>Вече имаш акаунт? Влез в системата от <Link to="/login">тук.</Link></p>

            </form>
        </>
    )
}

export default Register;