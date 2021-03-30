import {Component} from "react";
import "./DetailedStatus.css";
import Header from "../../common/Header";
import ProjectDetails from "./ProjectDetails";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";

// https://www.pluralsight.com/guides/using-multiple-fetch-statements-with-componentwillmount-in-react

class DetailedStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [],
            projectNotClicked: true,
            projectClickedId: null,
            projectClickedData: [],
            activeTasks: []
        }
    }

    async componentDidMount() {
        Promise.all([
            fetch(endpoints.CLIENTS).then(response => response.json()),
            fetch(endpoints.TASKS).then(response => response.json())
        ]).then(([allClientsWithProjectsInDB, allTasksInDB]) => {
            this.setState({
                weeklyData: this.filterProjectsWithNoTasks(allClientsWithProjectsInDB),
                activeTasks: allTasksInDB.length,
            });
        })
    }

    filterProjectsWithNoTasks(clients) {
        let result = clients.filter(({projects}) => {
                return projects.filter(({tasks}) => {
                        return tasks.filter(task => task.status === "active")
                    }
                )
            }
        )
        console.log(result)
        return result;
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

        const sidebarData = this.state.weeklyData.filter(client => client.projects).map(client => (
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

                        {!this.state.activeTasks && (
                            <div className="message">
                                <p>Все още няма създадени задачи :/</p>
                            </div>
                        )}

                        {this.state.projectNotClicked && this.state.activeTasks.length > 0 && (
                            <div className="message">
                                <p>Тази седмица ни очакват <span>{this.state.activeTasks}</span> задачи.</p>
                                <p>Да започваме :)</p>
                            </div>
                        )}

                        {!this.state.projectNotClicked && this.state.activeTasks && (
                            <ProjectDetails clickedProjectData={this.state.projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default DetailedStatus;