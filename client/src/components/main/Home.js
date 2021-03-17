import {Component} from "react";
import "./Home.css";

class Home extends Component {
    constructor() {
        super();
        this.state = {
            peopleData: [
                { path: "/", name: "Хилда", tasks: 30, projects: 9, clients: 3, department: "management" },
                { path: "/", name: "Соня", tasks: 12, projects: 18, clients: 1, department: "management" },
                { path: "/", name: "Боби", tasks: 25, projects: 13, clients: 2, department: "management" },
                { path: "/", name: "Милена", tasks: 22, projects: 33, clients: 22, department: "management" },
                { path: "/", name: "Веско", tasks: 11, projects: 23, clients: 22, department: "management" },
                { path: "/", name: "Даран", tasks: 0, projects: 3, clients: 1, department: "management" },
                { path: "/", name: "Елхо", tasks: 1, projects: 1, clients: 2, department: "management" },
                { path: "/", name: "Зевс", tasks: 225, projects: 213, clients: 122, department: "management" }
            ],
            weeklyData: { totalTasks: 101, totalProjects: 55, totalClients: 13 }
        }
    }

    render() {

        const icons = {
            management: process.env.PUBLIC_URL + "favicon.ico",
            creative: "",
            clientService: ""
        }

        const rowsData = this.state.peopleData.map(person => (
            <tr>
                <td><a href={person.path}>{person.name}</a></td>
                <td>{person.tasks}</td>
                <td>{person.projects}</td>
                <td>{person.clients}</td>
                <td><img src={icons[person.department]} alt=""/></td>
            </tr>
        ));

        return (
            <section className="weekly-status">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Задачи</th>
                            <th>Проекти</th>
                            <th>Клиенти</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { rowsData }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td>{ this.state.weeklyData.totalTasks }</td>
                            <td>{ this.state.weeklyData.totalProjects }</td>
                            <td>{ this.state.weeklyData.totalClients }</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </section>
        )
    }
}

export default Home;

