import Header from "../../common/Header";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import "./WeeklyStatusUser.css";

const WeeklyStatusUser = ({match}) => {
    const {id, name} = match.params;

    const [tasksOfUser, setTasksOfUser] = useState("");
    const [isAuth, setIsAuth] = useState(false);

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

    return (
        <>
            <Header title={name}/>

            <section className="user-weekly-info">

                {!tasksOfUser && (
                    <p>The info is loading...</p>
                )}

                {tasksOfUser && (
                    <table>
                        <thead>
                        <tr>
                            <th>Проект</th>
                            <th>Клиент</th>
                            <th>Задача</th>
                            <th>Действия</th>
                            {/*<th>Срок</th>*/}
                            {/*<th>Статус</th>*/}
                        </tr>
                        </thead>
                        <tbody>

                        {tasksOfUser.map(task => (
                            <tr key={task._id}>
                                <td>{task.clientId.clientName}</td>
                                <td>{task.projectId.projectName}</td>
                                <td>{task.taskName}</td>
                                <td>
                                    <div className="edit-form-buttons" style={{textAlign: "left"}}>
                                        <button className="complete">Приключи</button>
                                        <button className="edit">Редактирай</button>
                                        <button className="delete">Изтрий</button>
                                    </div>

                                    {/*{ !isAuth && (*/}
                                    {/*    <div className="edit-form-buttons" style={{textAlign: "left"}}>*/}
                                    {/*        <button name="complete">Детайли</button>*/}
                                    {/*    </div>*/}
                                    {/*) }*/}

                                </td>
                                {/*<td>*/}
                                {/*    <ul>*/}
                                {/*        {task.responsible.map(person => (*/}
                                {/*            <li key={person._id}>*/}
                                {/*                {person.username}*/}
                                {/*            </li>*/}
                                {/*        ))}*/}
                                {/*    </ul>*/}
                                {/*</td>*/}
                                {/*<td>{task.startDate.slice(0, 10)} - {task.endDate.slice(0, 10)}</td>*/}
                                {/*<td>{task.status}</td>*/}
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