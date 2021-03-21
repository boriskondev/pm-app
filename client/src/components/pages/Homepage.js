import { Component } from "react";
import "./Homepage.css";
import Header from "../common/Header";
import { Link } from "react-router-dom";
import { MdEmail as Email, MdPalette as Palette, MdAssessment as Assessment, MdSort as Sort } from "react-icons/md";

class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            peopleData: [
                { id: 1, path: "/", name: "Хилда", tasks: 30, projects: 9, clients: 3, department: "management" },
                { id: 2, path: "/", name: "Соня", tasks: 12, projects: 18, clients: 1, department: "creative" },
                { id: 3, path: "/", name: "Боби", tasks: 25, projects: 13, clients: 2, department: "clientService" },
                { id: 4, path: "/", name: "Милена", tasks: 22, projects: 33, clients: 22, department: "management" },
                { id: 5, path: "/", name: "Веско", tasks: 11, projects: 23, clients: 22, department: "creative" },
                { id: 6, path: "/", name: "Даран", tasks: 0, projects: 3, clients: 1, department: "clientService" },
                { id: 7, path: "/", name: "Елхо", tasks: 1, projects: 1, clients: 2, department: "creative" },
                { id: 8, path: "/", name: "Зевс", tasks: 225, projects: 213, clients: 122, department: "clientService" }
            ],
            weeklyData: { totalTasks: 101, totalProjects: 55, totalClients: 13 }
        }
    }

    render() {

        // console.log(this.props.match)
        // console.log(this.props.location)
        // console.log(this.props.history)

        const icons = {
            management: <Assessment size={25} />,
            creative: <Palette size={25} />,
            clientService: <Email size={25} />,
            sort: <Sort size={20} />
        }

        const rowsData = this.state.peopleData.map(person => (
            <tr key={person.id}>
                <td><a href={person.path}>{person.name}</a></td>
                <td>{person.tasks}</td>
                <td>{person.projects}</td>
                <td>{person.clients}</td>
                <td className="icon">{icons[person.department]}</td>
            </tr>
        ));

        return (
            <>
                <Link to="/weekly-status"><Header title="Обща информация" /></Link>

                <section className="weekly-overview">
                    <table>
                        <thead>
                            <tr>
                                <th>{icons.sort}</th>
                                <th>Задачи</th>
                                <th>Проекти</th>
                                <th>Клиенти</th>
                                <th>{icons.sort}</th>
                            </tr>
                        </thead>
                        <tbody>
                            { rowsData }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td>{this.state.weeklyData.totalTasks}</td>
                                <td>{this.state.weeklyData.totalProjects}</td>
                                <td>{this.state.weeklyData.totalClients}</td>
                                <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </section>
            </>

        )
    }
}

export default Homepage;
