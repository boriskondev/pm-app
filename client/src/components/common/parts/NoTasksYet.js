import {Link} from "react-router-dom";
import "./NoTasksYet.css";

const NoTasksYet = () => {
    return (
        <section className="no-tasks-yet">
            <p>No active tasks yet. You need to add at least one&nbsp;
                <Link to="add-client"><span>client</span></Link>,&nbsp;
                <Link to="add-project"><span>project</span></Link> and&nbsp;
                <Link to="add-task"><span>task</span></Link>&nbsp;first.
            </p>
        </section>
    )
}

export default NoTasksYet;