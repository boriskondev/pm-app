import Header from "../../common/parts/Header";
import "./UserStatus.css";
import {useState, useEffect, useContext} from "react";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import sortUserTasksByClientAndProject from "../../../utils/sortUserTasksByClientAndProject";
import LoadingIndicator from "../../common/parts/LoadingIndicator";
import fetchWrapper from "../../../services/fetchWrapper";
import icons from "../../../utils/icons";
import ModalDelete from "../../common/modals/ModalDelete";
import ModalComplete from "../../common/modals/ModalComplete";

const UserStatus = ({match}) => {
    const {id, name} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const [tasksOfUser, setTasksOfUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalComplete, setShowModalComplete] = useState(false);

    useEffect(() => {
        fetchWrapper.get(endpoints.TASKS_RESPONSIBLE + `/${id}`)
            .then(data => {
                setTasksOfUser(sortUserTasksByClientAndProject(data));
                setIsLoading(false)
            });
    }, []);

    const handleShowModalDelete = () => {
        setShowModalDelete(true);
    }

    const handleHideModalDelete = () => {
        setShowModalDelete(false);
    }

    const handleShowModalComplete = () => {
        setShowModalComplete(true);
    }

    const handleHideModalComplete = () => {
        setShowModalComplete(false);
    }

    const handleDelete = (id) => {
        fetchWrapper._delete(endpoints.TASKS + `/${id}`)
            .then(() => {
                setTasksOfUser(tasksOfUser.filter(task => task._id !== id));
                setShowModalDelete(false);
            })
    }

    const handleComplete = (id) => {
        fetchWrapper.patch(endpoints.TASKS + `/${id}`)
            .then(() => {
                setTasksOfUser(tasksOfUser.filter(task => task._id !== id));
                setShowModalComplete(false);
            });
    }

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
                            <th>Task</th>
                            <th>Client</th>
                            <th>Project</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasksOfUser.map(task => (
                            <tr key={task._id}>
                                <td>
                                    {task.taskName}
                                </td>
                                <td>
                                    {task.clientId.clientName}
                                </td>
                                <td>
                                    {task.projectId.projectName}
                                </td>
                                <td>
                                    <ul className="user-status-icons">
                                        {task.createdBy === loggedUser.userId
                                            ? (
                                                <>
                                                    <Link to={`/edit-task/${task._id}`}>
                                                        <li>{icons.edit}</li>
                                                    </Link>
                                                    <li onClick={() => handleShowModalComplete(task._id)}>{icons.complete}</li>
                                                    <ModalComplete
                                                        showModal={showModalComplete}
                                                        closeModal={handleHideModalComplete}
                                                        completeHandler={handleComplete}
                                                        id={task._id}
                                                    >
                                                        <p>Do you really want to complete the task?</p>
                                                    </ModalComplete>
                                                    <li onClick={(e) => handleShowModalDelete(e)}>{icons.delete}</li>
                                                    <ModalDelete
                                                        showModal={showModalDelete}
                                                        closeModal={handleHideModalDelete}
                                                        deleteHandler={handleDelete}
                                                        id={task._id}
                                                    >
                                                        <p>Do you really want to delete the task?</p>
                                                    </ModalDelete>
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