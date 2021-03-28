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
            usersData: "",
            activeTasks: ""
        }
    }

    async componentDidMount() {
        Promise.all([
            fetch(endpoints.USERS).then(response => response.json()),
            fetch(endpoints.TASKS).then(response => response.json())
        ]).then(([allUsersInDB, allTasksInDB]) => {
            this.setState({
                usersData: allUsersInDB.filter(user => user.tasks.length > 0),
                activeTasks: allTasksInDB,
            });
        })
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
                <Link to="/weekly-status"><Header title="Обща информация"/></Link>

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
                        {this.state.usersData && (
                            this.state.usersData.map(person => (
                                <tr key={person._id}>
                                    <td><Link to={`weekly-status/${person._id}/${person.username}`}>{person.username}</Link></td>
                                    <td>{person.tasks.length}</td>
                                    <td className="icon">{icons[person.department]}</td>
                                </tr>
                            ))
                        )}
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

