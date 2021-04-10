import {Component} from "react";
import "./Homepage.css";
import Header from "../../common/Header";
import {Link} from "react-router-dom";
import {MdEmail as Email, MdPalette as Palette, MdAssessment as Assessment, MdSort as Sort} from "react-icons/md";
import endpoints from "../../../services/api";

class Homepage extends Component {
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

    countTasksOfUser(id, tasks) {
        const result = tasks.filter(task => {
            return task.responsible.some(({_id}) => _id === id);
        });
        return result.length;
    }

    render() {

        const icons = {
            management: <Assessment size={25}/>,
            creative: <Palette size={25}/>,
            clientService: <Email size={25}/>,
            sort: <Sort size={20}/>
        }

        return (

            <>
                <Link to="/weekly-status"><Header title="Обща информация (всичко на английски)"/></Link>
                {/*{ this.state.user && (<h1>{this.state.user.username}</h1>) }*/}
                <section className="weekly-overview">
                    <table>
                        <thead>
                        <tr>
                            <th>{icons.sort}</th>
                            <th>Задачи</th>
                            <th>{icons.sort}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{!this.state.usersData && (*/}
                        {/*    <p>Малко търпение :)</p>*/}
                        {/*)}*/}
                        {this.state.users && this.state.activeTasks.length > 0 && (
                            this.state.users.map(user => (
                                this.countTasksOfUser(user._id, this.state.activeTasks) > 0
                                    ? (
                                        <tr key={user._id}>
                                            <td><Link
                                                to={`weekly-status/${user._id}/${user.username}`}>{user.username}</Link>
                                            </td>
                                            <td>{this.countTasksOfUser(user._id, this.state.activeTasks)}</td>
                                            <td className="icon">{icons[user.department]}</td>
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

export default Homepage;

