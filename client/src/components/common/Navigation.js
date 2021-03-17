import "./Navigation.css";

function Navigation() {

    return (
        <nav>
            <ul >
                <li>
                    <a href="/">
                        <img src={process.env.PUBLIC_URL + "/images/logos/header-logo.png"} alt="header-logo" />
                    </a>
                </li>
                <li><a href="/">Добави задача</a></li>
                <li><a href="/">Добави проект</a></li>
                <li><a href="/">Добави клиент</a></li>
            </ul>
            <ul>
                <li><a className="profile" href="/">Профил</a></li>
            </ul>
        </nav>
    )
}

export default Navigation;

