import {Component} from "react";
import "./HomepageLoggedIn.css";
import Header from "../../common/Header";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import countTasksOfUser from "../../../utils/countTasksOfUser";
import departmentsIcons from "../../../utils/departmentsIcons";

class HomepageLoggedIn extends Component {
    constructor() {
        super();
        this.state = {
            users: "",
            activeTasks: ""
        }
    }

    async componentDidMount() {
        Promise.all([
            fetch(endpoints.USERS).then(response => response.json()),
            fetch(endpoints.TASKS).then(response => response.json())
        ]).then(([allUsersInDB, allTasksInDB]) => {
            this.setState({
                users: allUsersInDB,
                activeTasks: allTasksInDB,
            });
        })
    }

    render() {

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

