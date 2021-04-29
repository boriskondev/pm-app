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
            <section className="form-wrapper">
            </section>

            <Header title="Add task"/>

            <section className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={false}>
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

                        {submitted && (<span className="success">{submitted}</span>)}
                        {error && (<span className="error">{error}</span>)}

                    </fieldset>

                    <button className="add" type="submit">Add</button>

                </form>
            </section>
        </>
    )
}

export default AddTask;