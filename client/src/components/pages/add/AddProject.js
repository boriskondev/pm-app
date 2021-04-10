import Header from "../../common/Header";
import "./AddTask.css";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

const AddProject = () => {
    const history = useHistory();
    const { loggedUser } = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [clientId, setClientId] = useState("");
    const [clientsOptions, setClientsOptions] = useState("");

    useEffect(() => {
        fetch(endpoints.CLIENTS)
            .then(response => response.json())
            .then(data => setClientsOptions(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProjectToAdd = {projectName, clientId, createdBy: loggedUser.userId};

        const selectedClient = await fetch(endpoints.CLIENTS + `/${clientId}`)
            .then(response => response.json());

        for (let project of selectedClient.projects) {
            if (project.projectName === projectName) {
                setError(true);
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
                return;
            }
        }

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newProjectToAdd)
        };

        fetch(endpoints.PROJECTS, requestOptions)
            .then(res => res.json())
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Add project"/>

            <form onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Name</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Client</label>
                    <select
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    >
                        <option hidden>Choose client</option>
                        {clientsOptions && clientsOptions.map(option => (
                            <option key={option._id} value={option._id}>{option.clientName}</option>
                        ))}
                    </select>
                    {submitted && (<span className="success">{projectName} added successfully.</span>)}
                    {error && (<span className="error">{projectName} is already registered.</span>)}
                </div>

                <button className="add" type="submit">Add</button>

            </form>
        </>
    )
}

export default AddProject;