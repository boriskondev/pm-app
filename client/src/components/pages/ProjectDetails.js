import {Component} from "react";
import "./ProjectDetails.css";

class ProjectDetails extends Component {
    constructor() {
        super();

        this.state = {
            projects: [
                {
                    id: 1, projectName: "Nivea Warehouse", tasks: [
                        {
                            id: 1,
                            taskName: "Go with the flow",
                            responsible: ["Boris", "Katya"],
                            term: "19.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 2,
                            taskName: "Everyday is good day",
                            responsible: ["Boris", "Katya", "Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                    ]
                },
                {
                    id: 2, projectName: "Cappy", tasks: [
                        {
                            id: 1,
                            taskName: "Open bottle",
                            responsible: ["Boris", "Hilda", "Katya"],
                            term: "111.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 2,
                            taskName: "I am really pissed off",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                    ]
                },
                {
                    id: 3, projectName: "Fuzetea", tasks: [
                        {
                            id: 1,
                            taskName: "sssss",
                            responsible: ["Boris", "Katya", "MAlak", "Kaval", "Borsuk"],
                            term: "19.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 2,
                            taskName: "sdsdsdsdsd",
                            responsible: ["Boris", "Katya", "Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                    ]
                },
                {
                    id: 4, projectName: "Spring promotion", tasks: [
                        {
                            id: 1,
                            taskName: "Hahahahaha",
                            responsible: ["Boris", "Hilda", "Katya"],
                            term: "111.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 2,
                            taskName: "We will fail bitime pissed off",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                        {
                            id: 3,
                            taskName: "Hahahahaha",
                            responsible: ["Boris", "Hilda", "Katya"],
                            term: "111.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 4,
                            taskName: "We will fail bitime pissed off",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                    ]
                },
                {
                    id: 5, projectName: "Mass transit", tasks: [
                        {
                            id: 1,
                            taskName: "The photoboy is really pissing me off",
                            responsible: ["Boris", "Hilda", "Vesko", "Katya"],
                            term: "ee",
                            status: "in progress"
                        },
                        {
                            id: 2,
                            taskName: "The JSON is smshing",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                        {
                            id: 3,
                            taskName: "Keny is already asleep",
                            responsible: ["Boris", "Hilda", "Katya"],
                            term: "111.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 4,
                            taskName: "Hel yeah",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                        {
                            id: 5,
                            taskName: "The photoboy is really pissing me off",
                            responsible: ["Boris", "Hilda", "Vesko", "Katya"],
                            term: "ee",
                            status: "in progress"
                        },
                        {
                            id: 6,
                            taskName: "The JSON is smshing",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                        {
                            id: 7,
                            taskName: "Keny is already asleep",
                            responsible: ["Boris", "Hilda", "Katya"],
                            term: "111.03-19-03",
                            status: "in progress"
                        },
                        {
                            id: 8,
                            taskName: "Hel yeah",
                            responsible: ["Pesho"],
                            term: "23.02-19-03",
                            status: "in progress"
                        },
                    ]
                }
            ]
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