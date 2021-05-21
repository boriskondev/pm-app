import React from "react";
import "./Footer.css"
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

function Footer() {
    const {loggedIn} = useContext(AuthContext);

    return (
        <footer>
            <img src={process.env.PUBLIC_URL + "/images/logos/footer-logo.png"} alt="footer-logo"/>

            {loggedIn === true && (
                <div className="statistics">
                    <p>Search</p>
                    <ul>
                        <li><Link to="/search-clients">Clients</Link></li>
                        {/*<li><Link>Projects</Link></li>*/}
                        {/*<li><Link>Tasks</Link></li>*/}
                    </ul>
                </div>
            )}

        </footer>
    )
}

export default Footer;