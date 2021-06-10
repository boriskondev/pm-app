import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import "../add/AddTask.css";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";
import LoadingIndicator from "../../common/parts/LoadingIndicator";

const EditTask = ({match}) => {
    const {id} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isNotCreator, setIsNotCreator] = useState(false);

    const [clientsOptions, setClientsOptions] = useState("");
    const [projectsOptions, setProjectsOptions] = useState("");
    const [responsibleOptions, setResponsibleOptions] = useState("");

    const [taskName, setTaskName] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectId, setProjectId] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [peopleResponsible, setPeopleResponsible] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);
            const allUsersInDB = await fetchWrapper.get(endpoints.USERS);
            const taskData = await fetchWrapper.get(endpoints.TASKS + `/${id}`);

            setClientsOptions(allClientsInDB);
            setResponsibleOptions(allUsersInDB);
            setTaskName(taskData.taskName);
            setIsNotCreator(taskData.createdBy !== loggedUser.userId);
            setClientName(taskData.clientId.clientName);
            setClientId(taskData.clientId._id);
            setProjectName(taskData.projectId.projectName);
            setProjectId(taskData.projectId._id);
            setIsLoading(false)
        };

        fetchData();

    }, []);

    const handleClientDropdownClick = (e, clientsOptions) => {
        let clientWithProjectsToEnlist = clientsOptions.filter(client => client._id === e.target.value)[0];
        setClientId(e.target.value);
        setProjectsOptions(clientWithProjectsToEnlist.projects);
    }

    const handleResponsibleFieldClick = (e, id) => {
        e.target.classList.toggle("name-clicked")
        if (!peopleResponsible.includes(id)) {
            setPeopleResponsible([...peopleResponsible, id])
        } else {
            const index = peopleResponsible.indexOf(id);
            peopleResponsible.splice(index, 1);
            setPeopleResponsible(peopleResponsible.filter(person => person._id !== id));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskName || !clientId || !projectId || !startDate || !endDate || peopleResponsible.length === 0) {
            setError("All fields are required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const startDateToDate = new Date(startDate);
        const endDateToDate = new Date(endDate);

        if (startDateToDate > endDateToDate) {
            setError("Start date cannot be later than the end date.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const taskToUpdate = {
            taskName,
            clientId,
            projectId,
            startDate,
            endDate,
            responsible: peopleResponsible
        };

        fetchWrapper.put(endpoints.TASKS + `/${id}`, taskToUpdate)
            .then(() => {
                setSubmitted(`${taskName} edited successfully.`);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            });
    }

    if (isLoading) {
        return (
            <>
                <Header title="Edit task"/>
                <LoadingIndicator/>
            </>
        )
    }

    return (
        <>
            <Header title="Edit task"/>

            <section className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={isNotCreator}>
                        <div className="form-field">
                            <label>Name</label>
                            <input
                                type="text"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                autoComplete="off"
                                autoFocus
                            />
                        </div>

                        <div className="form-field">
                            <label>Client</label>
                            <select
                                onChange={(e) => handleClientDropdownClick(e, clientsOptions)}
                            >
                                <option hidden>{clientName}</option>

                                {clientsOptions && clientsOptions.map(client => (
                                    <option key={client._id} value={client._id}>{client.clientName}</option>
                                ))}

                            </select>
                        </div>

                        <div className="form-field">
                            <label>Project</label>
                            <select
                                onChange={(e) => setProjectId(e.target.value)}
                            >

                                <option hidden="hidden">{projectName}</option>

                                {projectsOptions && projectsOptions.map(project => (
                                    <option key={project._id} value={project._id}>{project.projectName}</option>
                                ))}

                            </select>
                        </div>

                        <div className="form-field dates">
                            <label>Term</label>
                            <div id="task-term">
                                <input
                                    type="date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                                <span>-</span>
                                <input
                                    type="date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-field">
                            <label>People responsible</label>

                            <div className="responsible-chosen">
                                <ul>
                                    {responsibleOptions && responsibleOptions.map(person => (
                                        <li
                                            key={person._id}
                                            onClick={(e) => handleResponsibleFieldClick(e, person._id)}
                                        >
                                            {person.username}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </fieldset>

                    {isNotCreator
                        ? (
                            <div className="notifications">
                                <span className="error">You are not allowed to edit this.</span>
                            </div>
                        ) : (
                            <>
                                <Notifications submitted={submitted} error={error}/>
                                <button className="add" type="submit">Edit</button>
                            </>
                        )}

                </form>
            </section>

        </>
    )
}

export default EditTask;