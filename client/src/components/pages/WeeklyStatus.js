import { Component } from "react";
import "./WeeklyStatus.css";
import Header from "../common/Header";

class WeeklyStatus extends Component {
    constructor() {
        super();

        this.state = {
            weeklyData: [
                { id: 1, clientName: "Beiersdorf",
                    projects: [
                        {id: 1, projectName: "Nivea Warehouse" }
                        ] },
                { id: 2, clientName: "Coca-Cola",
                    projects: [
                        { id: 1, projectName: "Cappy" },
                        { id: 2, projectName: "Fuztea" }
                        ] },
                { id: 3, clientName: "Visa",
                    projects: [
                        { id: 1, projectName: "Spring promotion" },
                        { id: 2, projectName: "Mass transit" }
                    ] },
                { id: 4, clientName: "Kamenitza",
                    projects: [
                        { id: 1, projectName: "Airport branding" },
                        { id: 2, projectName: "RGB promo" },
                        { id: 3, projectName: "Events pitch" },
                        { id: 4, projectName: "Draft materials" },
                    ] },
            ]
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

    render() {

        const sidebarData = this.state.weeklyData.map(client => (
            <article>
                <button className="project-accordion"
                        onClick={(e) => this.handleAccordionClick(e)}
                        key={client.id}>{ client.clientName }
                </button>

                <div className="project-panel">
                    <ul>
                        { client.projects.map(project => (
                            <li key={ project.id }><a href="#">{ project.projectName }</a></li>
                        )) }
                    </ul>
                </div>

            </article>
        ));

        return (
            <>
                <Header title="Седмичен обзор" />

                <section className="content-wrapper">
                    <section className="projects-list">

                        { sidebarData }

                    </section>

                    <section className="project-info">
                        <h2><a href="#">Cappy 1l Campaign</a></h2>
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
                            <tr>
                                <td><a href="#">Изчистване на въпроси по 1л ТВ клип</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>01.03.21 - 02.03.21</td>
                                <td>Изпълнява се</td>
                            </tr>
                            <tr>
                                <td><a href="#">Послания - обратна връзка</a></td>
                                <td>
                                    <ul>
                                        <li>Веско</li>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>22.02.21 - 24.02.21</td>
                                <td>Чака одобрение</td>
                            </tr>
                            <tr>
                                <td><a href="#">Price tag - обратна връзка</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>22.02.21 - 24.02.21</td>
                                <td>Чака одобрение</td>
                            </tr>
                            <tr>
                                <td><a href="#">ПОП сет дизайн</a></td>
                                <td>
                                    <ul>
                                        <li>Катя</li>
                                        <li>Марто</li>
                                        <li>Хилда</li>
                                    </ul>
                                </td>
                                <td>15.02.21 - 19.02.211</td>
                                <td>Изпълнява се</td>
                            </tr>

                            </tbody>
                        </table>
                    </section>
                </section>
            </>
        )
    }
}

export default WeeklyStatus;