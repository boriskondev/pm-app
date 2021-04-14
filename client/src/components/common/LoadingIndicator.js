import Loader from "react-loader-spinner";

const LoadingIndicator = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Loader type="ThreeDots" color="#D62130" height="100" width="100" />
        </div>
    )
}

export default LoadingIndicator;