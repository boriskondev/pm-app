import Header from "../../common/Header";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import "./DetailedStatusUser.css";
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";

const DetailedStatusUser = ({match}) => {
    const history = useHistory();
    const {id, name} = match.params;

    const [tasksOfUser, setTasksOfUser] = useState([]);

    useEffect(() => {
        fetch(endpoints.TASKS_RESPONSIBLE + `/${id}`)
            .then(response => response.json())
            .then(data => setTasksOfUser(sortUserTasksByClientAndProject(data)));
    }, []);

    const sortUserTasksByClientAndProject = (data) => {
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
            .then(res => setTasksOfUser(tasksOfUser.filter(task => task._id !== id)));
    }

    const handleComplete = async (id) => {
        const requestOptions = {
            method: "PATCH",
            headers: {"Content-type": "application/json"}
        };

        fetch(endpoints.TASKS + `/${id}`, requestOptions)
            .then(res => res.json())
            .then(() => setTasksOfUser(tasksOfUser.filter(task => task._id !== id)));
    }

    console.log(tasksOfUser)

    return (

        <>
            <Header title={name}/>

            <section className="user-weekly-info">

                {tasksOfUser.length === 0 && (
                    <p>This user has 0 tasks for now.</p>
                )}

                {/*{!tasksOfUser && (*/}
                {/*    <p>The information is loading...</p>*/}
                {/*)}*/}

                {tasksOfUser.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>Клиент</th>
                            <th>Проект</th>
                            <th>Задача</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>

                        {tasksOfUser.map(task => (
                            <tr key={task._id}>
                                <td><Link to={`/edit-client/${task.clientId._id}`}>{task.clientId.clientName}</Link></td>
                                <td><Link to={`/edit-project/${task.projectId._id}`}>{task.projectId.projectName}</Link></td>
                                <td>{task.taskName}</td>
                                <td>
                                    <div className="buttons-div">
                                        <Link to={`/edit-task/${task._id}`}>
                                            <button className="edit">Редактирай</button>
                                        </Link>
                                        <button className="complete" onClick={(e) => handleComplete(task._id)}>Приключи</button>
                                        <button className="delete" onClick={(e) => handleDelete(task._id)}>Изтрий
                                        </button>
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

export default DetailedStatusUser;