import {Component} from "react";
import "./WeeklyStatus.css";
import Header from "../../common/Header";
import {Link} from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import endpoints from "../../../services/api";
import {projects} from "../../sampleData";

class WeeklyStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [],
            projectNotShown: true,
            projectClickedId: null,
            projectClickedData: null,
        }
    }

    async componentDidMount() {
        const allClientsWithProjectsInDB = await fetch(endpoints.CLIENTS).then(response => response.json());
        // To fetch the tasks in order to show how many tasks are there for the week?
        this.setState({weeklyData: allClientsWithProjectsInDB});
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
        const selectedProjectData = await fetch(endpoints.PROJECTS + `/${id}`).then(response => response.json());

        console.log(selectedProjectData)

        this.setState(() => ({
            projectNotShown: false,
            projectClickedId: id,
            projectClickedData: selectedProjectData,
        }));
    }

    render() {

        console.log(this.state.projectClickedId)

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
                                {project.projectName}
                            </li>
                        ))}
                    </ul>
                </div>

            </article>
        ));

        return (
            <>
                <Header title="Седмичен обзор"/>

                <section className="content-wrapper">
                    <section className="projects-list">
                        {sidebarData}
                    </section>

                    <section className="project-info">

                        {this.state.projectNotShown && (
                            <div className="message">
                                <p>Тази седмица ни очакват 107 задачи.</p>
                                <p>Да започваме :)</p>
                            </div>
                        )}

                        {this.state.projectClickedData && (
                            <ProjectDetails clickedProjectData={this.state.projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default WeeklyStatus;