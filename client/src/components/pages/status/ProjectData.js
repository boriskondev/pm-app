import {Component} from "react";
import "./ProjectData.css";

// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

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