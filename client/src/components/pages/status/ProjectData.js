import {Component} from "react";
import "./ProjectData.css";

class ProjectData extends Component {
    constructor(props) {
        super(props);
    }

    editDate(date) {
        let [ year, month, day ] = date.slice(0, 10).split("-");
        return `${day}.${month}.${year}`
    }

    filterProjects(data) {
        return data.tasks.filter(task => task.status === "active");
    }

    render() {
        return (
            <>
                {!this.props.clickedProjectData && (
                    <p>One moment, please, the information is loading :)</p>
                )}

                {this.props.clickedProjectData && (
                    <>
                        <h2>{this.props.clickedProjectData.projectName}</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Task</th>
                                <th>People responsible</th>
                                <th>Term</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.filterProjects(this.props.clickedProjectData).map(task => (
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
                                    <td>{this.editDate(task.startDate)} - {this.editDate(task.endDate)}</td>
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

export default ProjectData;