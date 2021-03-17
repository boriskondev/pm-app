import "./Header.css";

function Header(props) {
    return (
        <header>
            <a href="#"><h1>{props.title}</h1></a>
        </header>
    )
}

export default Header;