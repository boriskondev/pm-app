import "./Notifications.css";

const Notifications = ({submitted, error}) => {

    return (
        <div className="notifications">
            {submitted && (<span className="success">{submitted}</span>)}
            {error && (<span className="error">{error}</span>)}
        </div>
    )
}

export default Notifications;