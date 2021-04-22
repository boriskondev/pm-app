import Header from "../../common/Header";
import "./UserStatus.css";
import {useState, useEffect, useContext} from "react";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import sortUserTasksByClientAndProject from "../../../utils/sortUserTasksByClientAndProject";
import LoadingIndicator from "../../common/LoadingIndicator";
import fetchWrapper from "../../../services/fetchWrapper";
import icons from "../../../utils/icons";

const UserStatus = ({match}) => {
    const {id, name} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const [tasksOfUser, setTasksOfUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWrapper.get(endpoints.TASKS_RESPONSIBLE + `/${id}`)
            .then(data => {
                setTasksOfUser(sortUserTasksByClientAndProject(data));
                setIsLoading(false)
            });
    }, []);

    const handleDelete = async (id) => {
        fetchWrapper._delete(endpoints.TASKS + `/${id}`)
            .then(() => setTasksOfUser(tasksOfUser.filter(task => task._id !== id)));
    }

    const handleComplete = async (id) => {
        fetchWrapper.patch(endpoints.TASKS + `/${id}`)
            .then(() => setTasksOfUser(tasksOfUser.filter(task => task._id !== id)));
    }

    console.log(loggedUser)

    return (

        <>
            <Header title={name}/>

            <section className="user-weekly-info">

                {isLoading && (
                    <LoadingIndicator/>
                )}

                {tasksOfUser.length === 0 && !isLoading && (
                    <p className="no-tasks">
                        The user has 0 tasks. You can add tasks <Link><span>here</span></Link>.
                    </p>
                )}

                {tasksOfUser.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>Client</th>
                            <th>Project</th>
                            <th>Task</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasksOfUser.map(task => (
                            <tr key={task._id}>
                                <td>
                                    <Link to={`/edit-client/${task.clientId._id}`}>{task.clientId.clientName}</Link>
                                </td>
                                <td>
                                    <Link to={`/edit-project/${task.projectId._id}`}>{task.projectId.projectName}</Link>
                                </td>
                                <td>{task.taskName}</td>
                                <td>
                                    <ul className="user-status-icons">
                                        {task.createdBy === loggedUser.userId
                                            ? (
                                                <>
                                                    <Link to={`/edit-task/${task._id}`}>
                                                        <li>{icons.edit}</li>
                                                    </Link>
                                                    <li onClick={(e) => handleComplete(task._id)}>{icons.complete}</li>
                                                    <li onClick={(e) => handleDelete(task._id)}>{icons.delete}</li>
                                                </>
                                            )
                                            : (
                                                <Link to={`/edit-task/${task._id}`}>
                                                    <li>{icons.more}</li>
                                                </Link>
                                            )}
                                    </ul>
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

export default UserStatus;