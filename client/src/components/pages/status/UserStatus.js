import Header from "../../common/Header";
import "./UserStatus.css";
import {useState, useEffect, useContext} from "react";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import sortUserTasksByClientAndProject from "../../../utils/sortUserTasksByClientAndProject";
import LoadingIndicator from "../../common/LoadingIndicator";
import fetchWrapper from "../../../services/fetchWrapper";

const UserStatus = ({match}) => {
    const {id, name} = match.params;
    const { loggedUser } = useContext(AuthContext);

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

    return (

        <>
            <Header title={name}/>

            <section className="user-weekly-info">

                {isLoading && (
                    <LoadingIndicator/>
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
                                <td><Link to={`/edit-client/${task.clientId._id}`}>{task.clientId.clientName}</Link></td>
                                <td><Link to={`/edit-project/${task.projectId._id}`}>{task.projectId.projectName}</Link></td>
                                <td>{task.taskName}</td>
                                <td>
                                    { task.createdBy === loggedUser.userId && (
                                        <div className="buttons-div">
                                            <Link to={`/edit-task/${task._id}`}>
                                                <button className="edit">Edit</button>
                                            </Link>
                                            <button className="complete" onClick={(e) => handleComplete(task._id)}>Complete</button>
                                            <button className="delete" onClick={(e) => handleDelete(task._id)}>Delete</button>
                                        </div>
                                    ) }

                                    { task.createdBy !== loggedUser.userId && (
                                        <div className="buttons-div">
                                            <Link to={`/edit-task/${task._id}`}>
                                                <button className="edit">Details</button>
                                            </Link>
                                        </div>
                                    ) }

                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                )}

                {tasksOfUser.length === 0 && !isLoading && (
                    <p style={{padding: "120px", textAlign: "center", fontSize: "16px", backgroundColor: "white"}}>
                        The user has 0 tasks. You can add tasks <Link><span style={{fontWeight: "bold"}}>here</span></Link>.
                    </p>
                )}
            </section>

        </>
    )
}

export default UserStatus;