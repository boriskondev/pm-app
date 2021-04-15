import {Component} from "react";
import "./ProjectsStatus.css";
import Header from "../../common/Header";
import ProjectData from "./ProjectData";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import filterClientsAndProjects from "../../../utils/filterClientsAndProjects";
import fetchWrapper from "../../../services/fetchWrapper";

class ProjectsStatus extends Component {
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

    componentDidMount() {
        fetchWrapper.get(endpoints.TASKS)
            .then(data => {
                this.setState(() => ({
                    weeklyData: filterClientsAndProjects(data),
                    activeTasks: data,
                }));
            })
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

    handlePanelClick(e, id) {
        fetchWrapper.get(endpoints.PROJECTS + `/${id}`)
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
                <Header title="Detailed overview"/>

                <section className="content-wrapper">

                    <section className="projects-list">
                        {sidebarData}
                    </section>

                    <section className="project-info">

                        {this.state.activeTasks.length === 0 && (
                            <div className="message">
                                <p>There are no tasks added yet :/</p>
                            </div>
                        )}

                        {this.state.projectNotClicked && this.state.activeTasks.length > 0 && (
                            <div className="message">
                                <p>This week <span>{this.state.activeTasks.length}</span> tasks are waiting for us.</p>
                                <p>Let's begin :)</p>
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

export default ProjectsStatus;