import Header from "../../common/Header";
import "./AddTask.css";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";

const AddTask = () => {
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    // const [error, setError] = useState(false);

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
            const allClientsInDB = await fetch(endpoints.CLIENTS).then(response => response.json());
            const allUsersInDB = await fetch(endpoints.USERS).then(response => response.json());

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

        const newTaskToAdd = {
            taskName,
            createdBy: "605a5456b97d5f24dc7c1b38",
            clientId,
            projectId,
            startDate,
            endDate,
            responsible: peopleResponsible
        };

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTaskToAdd)
        };

        fetch(endpoints.TASKS, requestOptions)
            .then(res => res.json())
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            });
    }
    const newTaskToAdd = {
        taskName,
        createdBy: "605a5456b97d5f24dc7c1b38",
        projectId,
        startDate,
        endDate,
        responsible: peopleResponsible
    };

    return (
        <>
            <Header title="Add task"/>

            <form onSubmit={handleSubmit} >
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
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Client</label>
                        <select
                            onChange={(e) => handleClientDropdownClick(e, clientsOptions)}
                            required
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
                            required
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
                                required
                            />
                            <span>-</span>
                            <input
                                type="date"
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label>People responsible</label>
                        <select
                            onClick={(e) => handleResponsibleOptionsClick(e)}
                            size={responsibleOptions.length}
                            multiple
                            required
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
                        {submitted && (<span className="success">{taskName} added successfully.</span>)}
                        {/*{error && (<span className="error">{clientName} is already registered.</span>)}*/}
                    </div>

                </fieldset>

                <button className="add" type="submit">Add</button>

            </form>
        </>
    )
}

export default AddTask;