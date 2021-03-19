import "./Navigation.css";
import { Link } from "react-router-dom";

function Navigation() {

    return (
        <nav>
            <ul >
                <li>
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + "/images/logos/header-logo.png"} alt="header-logo" />
                    </Link>
                </li>
                <li><Link to="/add-task">Добави задача</Link></li>
                <li><Link to="/add-project">Добави проект</Link></li>
                <li><Link to="/add-client">Добави клиент</Link></li>
            </ul>
            <ul>
                <li><Link to="/profile">Профил</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation;

