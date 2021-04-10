import Header from "../../common/Header";
import "../add/AddTask.css";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {useContext} from "react";

const EditTask = ({match}) => {
    const {id} = match.params;
    const { loggedUser } = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    // const [error, setError] = useState(false);

    const [fieldsetDisplay, setFieldsetDisplay] = useState(false);

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
            const allClientsInDB = await fetch(endpoints.CLIENTS).then(response => response.json());
            const allUsersInDB = await fetch(endpoints.USERS).then(response => response.json());
            const taskData = await fetch(endpoints.TASKS + `/${id}`).then(response => response.json());

            setClientsOptions(allClientsInDB);
            setResponsibleOptions(allUsersInDB);
            setTaskName(taskData.taskName);
            setFieldsetDisplay(taskData.createdBy !== loggedUser.userId);
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

        const taskToUpdate = {
            taskName,
            clientId,
            projectId,
            startDate,
            endDate,
            responsible: peopleResponsible
        };

        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(taskToUpdate)
        };

        fetch(endpoints.TASKS + `/${id}`, requestOptions)
            .then(res => res.json())
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Edit task"/>

            <form onSubmit={handleSubmit}>
                <fieldset disabled={fieldsetDisplay}>
                    <div className="form-field">
                        <label>Name</label>
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
                            required
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
                        {submitted && (<span className="success">Task edited successfully.</span>)}
                    </div>

                </fieldset>

                { fieldsetDisplay === false && (
                    <button className="add" type="submit">Edit</button>
                ) }

            </form>
        </>
    )
}

export default EditTask;