import React from "react";
import "./Footer.css"
import {Link} from "react-router-dom";
import SearchClients from "../../pages/search/SearchClients";

function Footer() {

    return (
        <footer>
            <img src={process.env.PUBLIC_URL + "/images/logos/footer-logo.png"} alt="footer-logo"/>
            <div className="statistics">
                <p>Search</p>
                <ul>
                    <li><Link to="/search-clients">Clients</Link></li>
                    {/*<li><Link>Projects</Link></li>*/}
                    {/*<li><Link>Tasks</Link></li>*/}
                </ul>
            </div>
        </footer>
    )
}

export default Footer;