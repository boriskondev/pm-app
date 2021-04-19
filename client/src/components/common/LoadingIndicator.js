import Loader from "react-loader-spinner";
import "./LoadingIndicator.css"

const LoadingIndicator = () => {
    return (
        <div className="loader">
            <Loader type="ThreeDots" color="#D62130" height="100" width="100" />
        </div>
    )
}

export default LoadingIndicator;