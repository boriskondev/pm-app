// import "./Header.css";

function Header(props) {
    const headerStyle = {
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        padding: "20px"
    }

    const headerHeadingStyle = {
        margin: "0",
        padding: "20px"
    }

    return (
        <header style={headerStyle}>
            <h1 style={headerHeadingStyle}>{props.title}</h1>
        </header>
    )
}

export default Header;