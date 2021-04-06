import {Component} from "react";
import "./DetailedStatus.css";
import Header from "../../common/Header";
import ProjectData from "./ProjectData";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";

class DetailedStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [],
            projectNotClicked: true,
            projectClickedId: null,
            projectClickedData: [],
            activeTasks: ""
        }
    }

    async componentDidMount() {
        await fetch(endpoints.TASKS)
            .then(response => response.json())
            .then(data => {
                this.setState(() => ({
                    weeklyData: this.filterClientsAndProjects(data),
                    activeTasks: data,
                }));
            })
    }

    filterClientsAndProjects(data) {
        let newArr = []
        for (let task of data) {
            let client = task.clientId.clientName;
            let clientId = task.clientId._id;
            let project = task.projectId.projectName;
            let projectId = task.projectId._id;

            let clientFound = newArr.filter(client => client._id === clientId)[0];

            if (!clientFound) {
                newArr.push({ clientName: client,  _id: clientId,
                    projects: [{ projectName: project,  _id: projectId }] })

            } else {
                let projectFound = clientFound.projects.filter(project => project._id === projectId)[0];
                if (!projectFound) {
                    clientFound.projects.push({ projectName: project,  _id: projectId })
                }
            }
        }
        return newArr;
    }

    handleAccordionClick(e) {
        let accordion = e.target;
        accordion.classList.toggle("active");
        let accordionPanel = accordion.nextElementSibling;
        if (accordionPanel.style.display === "block") {
            accordionPanel.style.display = "none";
        } else {
            accordionPanel.style.display = "block";
        }
    }

    async handlePanelClick(e, id) {
        await fetch(endpoints.PROJECTS + `/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState(() => ({
                    projectNotClicked: false,
                    projectClickedId: id,
                    projectClickedData: data,
                }));
            })
    }

    render() {
        const sidebarData = this.state.weeklyData.map(client => (
            <article key={client._id}>
                <button className="project-accordion"
                        onClick={(e) => this.handleAccordionClick(e)}
                >
                    {client.clientName}
                </button>
                <div className="project-panel">
                    <ul>
                        {client.projects.map(project => (
                            <li key={project._id} value={project._id}
                                onClick={(e) => this.handlePanelClick(e, project._id)}>
                                <Link>{project.projectName}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </article>
        ));

        return (
            <>
                <Header title="Детайлна информация"/>

                <section className="content-wrapper">

                    <section className="projects-list">
                        {sidebarData}
                    </section>

                    <section className="project-info">

                        {this.state.activeTasks.length === 0 && (
                            <div className="message">
                                <p>Все още няма създадени задачи :/</p>
                            </div>
                        )}

                        {this.state.projectNotClicked && this.state.activeTasks.length > 0 && (
                            <div className="message">
                                <p>Тази седмица ни очакват <span>{this.state.activeTasks.length}</span> задачи.</p>
                                <p>Да започваме :)</p>
                            </div>
                        )}

                        {!this.state.projectNotClicked && this.state.activeTasks && (
                            <ProjectData clickedProjectData={this.state.projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default DetailedStatus;