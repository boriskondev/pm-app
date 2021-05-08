import Header from "../../common/parts/Header";
import {Link} from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
    return (
        <>
            <Header title="404: Page not found"/>
            <div className="not-found">
                <p>If you go <Link to="/"><span>home</span></Link> you may find what you are looking for.</p>
            </div>
        </>
    )
}

export default PageNotFound;