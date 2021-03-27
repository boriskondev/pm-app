import Header from "../../common/Header";
import {useState} from "react";
import "./Register.css";
import {Link} from "react-router-dom";

// https://medium.com/technoetics/create-basic-login-forms-using-react-js-hooks-and-bootstrap-2ae36c15e551

const Register = () => {
    const [state, setState] = useState({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        repeatPassword: "",
    })


    const handleFieldChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({...prevState, [id]: value}))
    }

    console.log(state);

    return (
        <>
            <Header title="Регистрация"/>

            <form className="register">

                <div className="form-field">
                    <label>Име</label>
                    <input
                        type="text"
                        id="firstName"
                        value={state.firstName}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Фамилия</label>
                    <input
                        type="text"
                        id="secondName"
                        value={state.secondName}
                        onChange={handleFieldChange}
                        autoComplete="off"
                        required
                    />
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