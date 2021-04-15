import Header from "../../common/Header";
import "./AddTask.css";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const AddTask = () => {
    const history = useHistory();
    const {loggedUser} = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [taskName, setTaskName] = useState("");
    const [clientsOptions, setClientsOptions] = useState("");
    const [clientId, setClientId] = useState("");
    const [projectsOptions, setProjectsOptions] = useState("");
    const [projectId, setProjectId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [responsibleOptions, setResponsibleOptions] = useState("");
    const [peopleResponsible, setPeopleResponsible] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);
            const allUsersInDB = await fetchWrapper.get(endpoints.USERS);

            setClientsOptions(allClientsInDB);
            setResponsibleOptions(allUsersInDB);
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

        const newTaskToAdd = {
            taskName,
            createdBy: loggedUser.userId,
            clientId,
            projectId,
            startDate,
            endDate,
            responsible: peopleResponsible
        };

        fetchWrapper.post(endpoints.TASKS, newTaskToAdd)
            .then(() => {
                setSubmitted(`${taskName} added successfully.`);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Add task"/>

            <form onSubmit={handleSubmit}>
                <fieldset disabled={false}>
                    {/*<fieldset disabled={false}>*/}
                    <div className="form-field">
                        <label>Име</label>
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
                            <option hidden>Choose client</option>

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

                            <option hidden="hidden">Choose project</option>

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

                <button className="add" type="submit">Add</button>

            </form>
        </>
    )
}

export default AddTask;