import {Component} from "react";
import "./WeeklyStatus.css";
import Header from "../../common/Header";
import ProjectDetails from "./ProjectDetails";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";

// https://www.pluralsight.com/guides/using-multiple-fetch-statements-with-componentwillmount-in-react

class WeeklyStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [],
            projectNotClicked: true,
            projectClickedId: null,
            projectClickedData: null,
            activeTasks: null
        }
    }

    async componentDidMount() {
        Promise.all([
            fetch(endpoints.CLIENTS).then(response => response.json()),
            fetch(endpoints.TASKS).then(response => response.json())
        ]).then(([allClientsWithProjectsInDB, allTasksInDB]) => {
            this.setState({
                weeklyData: allClientsWithProjectsInDB,
                activeTasks: allTasksInDB.length,
            });
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
                <Header title="Седмичен обзор"/>

                <section className="content-wrapper">
                    <section className="projects-list">
                        {sidebarData}
                    </section>

                    <section className="project-info">

                        {this.state.projectNotClicked && this.state.weeklyData && (
                            <div className="message">
                                <p>Тази седмица ни очакват <span>{this.state.activeTasks}</span> задачи.</p>
                                <p>Да започваме :)</p>
                            </div>
                        )}

                        {!this.state.projectNotClicked && this.state.weeklyData && (
                            <ProjectDetails clickedProjectData={this.state.projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default WeeklyStatus;