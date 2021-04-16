import Header from "../../common/Header";
import "../add/AddTask.css";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const EditTask = ({match}) => {
    const {id} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

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
            // setProjectsOptions(clientsOptions.filter(client => client._id === projectId)[0].projects)
        };

        fetchData();

    }, []);

    const handleClientDropdownClick = (e, clientsOptions) => {
        let clientWithProjectsToEnlist = clientsOptions.filter(client => client._id === e.target.value)[0];
        setClientId(e.target.value);
        setProjectsOptions(clientWithProjectsToEnlist.projects);
    }

    const handleResponsibleOptionsClick = (e) => {
        const personIdClicked = e.target.value;
        if (!peopleResponsible.includes(personIdClicked)) {
            setPeopleResponsible([...peopleResponsible, personIdClicked])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!taskName || !clientId || !projectId || !startDate || !endDate || !peopleResponsible) {
            setError("All fields are required.");
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
                            <select
                                onClick={(e) => handleResponsibleOptionsClick(e)}
                                size={responsibleOptions.length}
                                multiple
                            >

                                {responsibleOptions && responsibleOptions.map(option => (
                                    <option
                                        key={option._id}
                                        value={option._id}
                                    >
                                        {option.username}
                                    </option>
                                ))}

                            </select>
                            {submitted && (<span className="success">{submitted}</span>)}
                            {error && (<span className="error">{error}</span>)}
                        </div>

                    </fieldset>

                    {isNotCreator === false && (
                        <button className="add" type="submit">Edit</button>
                    )}

                </form>
            </section>

        </>
    )
}

export default EditTask;