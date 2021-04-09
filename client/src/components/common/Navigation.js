import "./Navigation.css";
import {Link} from "react-router-dom";
import endpoints from "../../services/api";
import { useHistory } from "react-router-dom";

function Navigation() {
    const history = useHistory();

    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    };

    const logoutHandler = () => {
        fetch(endpoints.LOGOUT, requestOptions)
            .then(res => res)
            .then(data => {
                console.log(data);
            })
            .then(() => {
                history.push("/")
            })
            .catch(err => console.log("In catch" + err))
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + "/images/logos/header-logo.png"} alt="header-logo"/>
                    </Link>
                </li>
                <li><Link to="/add-task">Добави задача</Link></li>
                <li><Link to="/add-project">Добави проект</Link></li>
                <li><Link to="/add-client">Добави клиент</Link></li>
            </ul>
            <ul>
                <li><Link to="/register">Регистрация</Link></li>
                <li><Link to="/login">Вход</Link></li>
                <li><Link to="/profile">Профил</Link></li>
                <li><Link to="/" onClick={logoutHandler}>Изход</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;

