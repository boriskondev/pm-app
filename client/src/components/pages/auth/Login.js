import Header from "../../common/Header";
import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

// https://medium.com/technoetics/create-basic-login-forms-using-react-js-hooks-and-bootstrap-2ae36c15e551

const Login = () => {
    const [state , setState] = useState({
        email: "",
        password: ""
    })


    const handleFieldChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({...prevState, [id] : value}))
    }

    console.log(state);

    return (
        <>
            <Header title="Вход"/>

            <form className="register">

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

                <button className="add" type="submit">Добави</button>

                <p>Още нямаш акаунт? Регистрирай се <Link to="/register">тук.</Link></p>

            </form>
        </>
    )
}

export default Login;