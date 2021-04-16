import {Component} from "react";
import "./HomepageLoggedIn.css";
import Header from "../../common/Header";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import countTasksOfUser from "../../../utils/countTasksOfUser";
import departmentsIcons from "../../../utils/departmentsIcons";
import LoadingIndicator from "../../common/LoadingIndicator";
import fetchWrapper from "../../../services/fetchWrapper";

class HomepageLoggedIn extends Component {
    constructor() {
        super();
        this.state = {
            users: "",
            activeTasks: "",
            isLoading: true
        }
    }

    async componentDidMount() {
        Promise.all([
            fetchWrapper.get(endpoints.USERS),
            fetchWrapper.get(endpoints.TASKS)
        ]).then(([allUsersInDB, allTasksInDB]) => {
            this.setState({
                users: allUsersInDB,
                activeTasks: allTasksInDB,
                isLoading: false
            });
        })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <>
                    <Link to="/weekly-status"><Header title="Overview"/></Link>
                    <LoadingIndicator />
                </>

            )
        }

        if (this.state.activeTasks === 0) {
            return (
                <>
                    <Link to="/weekly-status"><Header title="Overview"/></Link>
                    <section className="no-tasks-yet">
                        <p>No active tasks. You need to add at least one&nbsp;
                            <Link to="add-client"><span>client</span></Link>,&nbsp;
                            <Link to="add-project"><span>project</span></Link> and&nbsp;
                            <Link to="add-task"><span>task</span></Link>&nbsp;first.
                        </p>
                    </section>
                </>
            )
        }

        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <section className="weekly-overview">
                    <table>
                        <thead>
                        <tr>
                            <th>{departmentsIcons.sort}</th>
                            <th>Tasks</th>
                            <th>{departmentsIcons.sort}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.users && this.state.activeTasks.length > 0 && (
                            this.state.users.map(user => (
                                countTasksOfUser(user._id, this.state.activeTasks) > 0
                                    ? (
                                        <tr key={user._id}>
                                            <td><Link
                                                to={`weekly-status/${user._id}/${user.username}`}>{user.username}</Link>
                                            </td>
                                            <td>{countTasksOfUser(user._id, this.state.activeTasks)}</td>
                                            <td className="icon">{departmentsIcons[user.department]}</td>
                                        </tr>
                                    )
                                    : null
                            )))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td>{this.state.activeTasks.length}</td>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </section>
            </>
        )
    }
}

export default HomepageLoggedIn;

