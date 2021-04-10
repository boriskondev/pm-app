import "./Navigation.css";
import {Link} from "react-router-dom";
import endpoints from "../../services/api";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

function Navigation() {
    const history = useHistory();
    const { loggedIn, getLoggedIn } = useContext(AuthContext);

    async function logoutHandler() {
        const res = await axios.get(endpoints.LOGOUT);
        console.log(res)
        await getLoggedIn();
    }

    return (
        <nav>
            {loggedIn === false && (
                <>
                    <ul>
                        <li>
                            <Link to="/">
                                <img src={process.env.PUBLIC_URL + "/images/logos/header-logo.png"} alt="header-logo"/>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li><Link to="/register">Регистрация</Link></li>
                        <li><Link to="/login">Вход</Link></li>
                    </ul>
                </>
            )}

            {loggedIn === true && (
                <>
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
                        <li><Link to="/profile">Профил</Link></li>
                        <li><Link to="/" onClick={logoutHandler}>Изход</Link></li>
                    </ul>
                </>
            )}
        </nav>
    )
}

export default Navigation;

