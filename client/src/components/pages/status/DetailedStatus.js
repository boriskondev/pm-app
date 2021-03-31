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

    filterProjectsWithNoTasks(db) {
        const filteredDb = db.slice(0);

        const digInProjects = (projects, index, currProject) => {
            if (projects.length === 0) return;

            const tasks = projects[0].tasks;

            if (tasks.length > 0) {
                const filteredTasks = tasks.filter((task) => task.status !== "complete");

                filteredDb[index].projects[currProject].tasks = filteredTasks;
            } else {
                filteredDb[index].projects.splice(currProject, 1);
            }

            digInProjects(projects.slice(1), index, currProject + 1);
        };

        const checkIfClientDone = (projects) => {
            if (projects.length === 0) return true;

            if (projects[0].tasks.length > 0) return false;

            return checkIfClientDone(projects.slice(1));
        };

        for (let i = 0; i < filteredDb.length; i++) {
            const currObj = filteredDb[i];
            digInProjects(currObj.projects, i, 0);

            if (checkIfClientDone(currObj.projects)) {
                filteredDb.splice(i, 1);
            }
        }
        console.log(filteredDb)
        return filteredDb;
    };

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