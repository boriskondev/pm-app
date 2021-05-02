import "./Navigation.css";
import {Link} from "react-router-dom";
import endpoints from "../../services/api";
import {useHistory} from "react-router-dom";
import axios from "axios";

function Navigation({loggedIn, getLoggedIn}) {
    const history = useHistory();

    async function logoutHandler() {
        await axios.get(endpoints.LOGOUT);
        await getLoggedIn();
        history.push("/");
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
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Log in</Link></li>
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
                        <li><Link to="/add-task">Add task</Link></li>
                        <li><Link to="/add-project">Add project</Link></li>
                        <li><Link to="/add-client">Add client</Link></li>
                    </ul>
                    <ul>
                        {/*<li className="user-welcome">Welcome, <span>{loggedUser.username}</span></li>*/}
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/" onClick={logoutHandler}>Exit</Link></li>
                    </ul>
                </>
            )}
        </nav>
    )
}

export default Navigation;

