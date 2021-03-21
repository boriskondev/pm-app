import { Component } from "react";
import "./WeeklyStatus.css";
import Header from "../common/Header";
import {Link} from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

class WeeklyStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [
                {
                    id: 1, clientName: "Beiersdorf",
                    projects: [
                        {id: 1, projectName: "Nivea Warehouse"}
                    ]
                },
                {
                    id: 2, clientName: "Coca-Cola",
                    projects: [
                        {id: 2, projectName: "Cappy"},
                        {id: 3, projectName: "Fuztea"}
                    ]
                },
                {
                    id: 3, clientName: "Visa",
                    projects: [
                        {id: 4, projectName: "Spring promotion"},
                        {id: 5, projectName: "Mass transit"}
                    ]
                }
            ],
            projectNotShown: true,
            projectClickedId: null
        }
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
        this.setState(() => ({projectNotShown: false}));
        this.setState(() => ({projectClickedId: id}));
    }

    render() {

        const sidebarData = this.state.weeklyData.map(client => (
            <article>
                <button className="project-accordion"
                        onClick={(e) => this.handleAccordionClick(e)}
                        key={client.id}>
                    {client.clientName}
                </button>
                <div className="project-panel">
                    <ul>
                        {client.projects.map(project => (
                            <li key={project.id}>
                                <Link onClick={(e) => this.handlePanelClick(e, project.id)}>
                                    {project.projectName}
                                </Link>
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

                        {!this.state.projectNotShown && (
                            <ProjectDetails projectToDisplay={this.state.projectClickedId}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default WeeklyStatus;