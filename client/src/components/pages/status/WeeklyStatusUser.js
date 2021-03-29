import Header from "../../common/Header";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import "./WeeklyStatusUser.css";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

const WeeklyStatusUser = ({match}) => {
    const history = useHistory();
    const {id, name} = match.params;

    const [tasksOfUser, setTasksOfUser] = useState([]);

    useEffect(() => {
        fetch(endpoints.TASKS_RESPONSIBLE + `/${id}`)
            .then(response => response.json())
            .then(data => setTasksOfUser(sortUserTasks(data)));
    }, []);

    const sortUserTasks = (data) => {
        data.sort((a, b) =>
            (a.clientId.clientName > b.clientId.clientName)
                ? 1 : (a.clientId.clientName === b.clientId.clientName)
                ? ((a.projectId.projectName > b.projectId.projectName)
                    ? 1 : -1) : -1)
        return data;
    }

    const handleDelete = async (id) => {
        const requestOptions = {
            method: "DELETE"
        };

        fetch(endpoints.TASKS + `/${id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                history.push(`weekly-status/${id}`)
            });
    }

    return (
        <>
            <Header title={name}/>

            <section className="user-weekly-info">

                {!tasksOfUser && (
                    <p>The info is loading...</p>
                )}

                {tasksOfUser.length === 0 && (
                    <p>This user has 0 tasks for now.</p>
                )}

                {tasksOfUser.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>Проект</th>
                            <th>Клиент</th>
                            <th>Задача</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>

                        {tasksOfUser.map(task => (
                            <tr key={task._id}>
                                <td>{task.clientId.clientName}</td>
                                <td>{task.projectId.projectName}</td>
                                <td>{task.taskName}</td>
                                <td>
                                    <div className="buttons-div">
                                        <Link to="/"><button className="edit">Редактирай</button></Link>
                                        <button className="complete">Приключи</button>
                                        <button className="delete" onClick={(e) => handleDelete(task._id)}>Изтрий</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                )}
            </section>

        </>
    )
}

export default WeeklyStatusUser;