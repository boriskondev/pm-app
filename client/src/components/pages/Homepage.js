import { Component } from "react";
import "./Homepage.css";

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

        const iconsPath = process.env.PUBLIC_URL + "images/icons/";

        const icons = {
            management: iconsPath + "assessment-24px.svg",
            creative: iconsPath + "palette-24px.svg",
            clientService: iconsPath + "email-24px.svg",
            sort: iconsPath + "sort-24px.svg"
        }

        const rowsData = this.state.peopleData.map(person => (
            <tr key={person.id}>
                <td><a href={person.path}>{person.name}</a></td>
                <td>{person.tasks}</td>
                <td>{person.projects}</td>
                <td>{person.clients}</td>
                <td className="icon"><img src={icons[person.department]} alt=""/></td>
            </tr>
        ));

        return (
            <section className="weekly-overview">
                <table>
                    <thead>
                        <tr>
                            <th><img src={icons.sort} alt=""/></th>
                            <th>Задачи</th>
                            <th>Проекти</th>
                            <th>Клиенти</th>
                            <th><img src={icons.sort} alt=""/></th>
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
        )
    }
}

export default Homepage;

