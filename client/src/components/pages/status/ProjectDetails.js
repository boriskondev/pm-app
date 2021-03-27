import {Component} from "react";
import "./ProjectDetails.css";
import endpoints from "../../../services/api";

class ProjectDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectData: this.props.clickedProjectData
        }
    }


    render() {
        return (
            <>
                {!this.state.projectData && (
                    <p>Момент :)</p>
                )}
                {this.state.projectData && (
                    <>
                        <h2><a href="#">{this.state.projectData.projectName}</a></h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Задача</th>
                                <th>Отговорни</th>
                                <th>Срок</th>
                                <th>Статус</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.projectData.tasks.map(task => (
                                <tr key={task._id}>
                                    <td><a href="#">{task.taskName}</a></td>
                                    <td>
                                        <ul>
                                            {task.responsible.map(person => (
                                                <li key={person._id}>{person.username}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{task.startDate.slice(0, 10)} - {task.endDate.slice(0, 10)}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}

                            </tbody>
                        </table>
                    </>

                )}
            </>
        )
    }
}

export default ProjectDetails;