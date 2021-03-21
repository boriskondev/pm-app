import {Component} from "react";
import "./ProjectDetails.css";
import { projects } from "../sampleData";

class ProjectDetails extends Component {
    constructor() {
        super();

        this.state = {
            projects
        }
    }

    render() {

        // This should fetch the project data by ID, not take it from state.
        let projectToDisplay = this.state.projects.filter(project => project.id === this.props.projectToDisplay);
        projectToDisplay = projectToDisplay[0]

        return (
            <>
                <h2><a href="#">{projectToDisplay.projectName}</a></h2>
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

                    {projectToDisplay.tasks.map(task => (
                        <tr key={task.id}>
                            <td><a href="#">{task.taskName}</a></td>
                            <td>
                                <ul>
                                    {task.responsible.map(person => (
                                        <li>{person}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{task.term}</td>
                            <td>{task.status}</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </>

        )
    }
}

export default ProjectDetails;