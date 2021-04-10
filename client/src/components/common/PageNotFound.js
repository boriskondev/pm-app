import Header from "./Header";
import {Link} from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <Header title="404: Page not found"/>
            <div style={{padding: "120px", textAlign: "center", fontSize: "16px", backgroundColor: "white"}}>
                <p>If you go <Link to="/"><span style={{fontWeight: "bold"}}>home</span></Link> you may find what you are looking for.</p>
            </div>
        </>
    )
}

export default PageNotFound;