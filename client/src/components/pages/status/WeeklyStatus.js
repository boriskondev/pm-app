import {Component} from "react";
import "./WeeklyStatus.css";
import Header from "../../common/Header";
import ProjectDetails from "./ProjectDetails";
import endpoints from "../../../services/api";

class WeeklyStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [],
            projectNotClicked: true,
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

                        {this.state.projectNotClicked && (
                            <div className="message">
                                {/*Just a placeholder for now.*/}
                                <p>Тази седмица ни очакват 107 задачи.</p>
                                <p>Да започваме :)</p>
                            </div>
                        )}

                        {!this.state.projectNotClicked && (
                            <ProjectDetails clickedProjectData={this.state.projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default WeeklyStatus;