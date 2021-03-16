import "./Footer.css"

function Footer() {
    return (
        <footer>
            <img src="images/footer-logo.png" alt="footer-logo" />
                <div className="statistics">
                    <p>Справки</p>
                    <ul>
                        <li><a href="/">Задачи</a></li>
                        <li><a href="/">Проекти</a></li>
                        <li><a href="/">Клиенти</a></li>
                    </ul>
                </div>
        </footer>
    )
}

export default Footer;