import {Component} from "react";
import "./ProjectDetails.css";

// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

class ProjectDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {!this.props.clickedProjectData && (
                    <p>Момент, информацията се зарежда :)</p>
                )}
                {this.props.clickedProjectData && (
                    <>
                        <h2>{this.props.clickedProjectData.projectName}</h2>
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

                            {this.props.clickedProjectData.tasks.map(task => (
                                <tr key={task._id}>
                                    <td>{task.taskName}</td>
                                    <td>
                                        <ul>
                                            {task.responsible.map(person => (
                                                <li key={person._id}>
                                                    {person.username}
                                                </li>
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