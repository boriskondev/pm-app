import Header from "../../common/Header";
import "./AddTask.css";
import {useState, useEffect, useContext} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const AddProject = () => {
    const history = useHistory();
    const {loggedUser} = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [projectName, setProjectName] = useState("");
    const [clientId, setClientId] = useState("");
    const [clientsOptions, setClientsOptions] = useState("");

    useEffect(() => {
        fetchWrapper.get(endpoints.CLIENTS)
            .then(data => setClientsOptions(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProjectToAdd = {projectName, clientId, createdBy: loggedUser.userId};

        const selectedClient = await fetchWrapper.get(endpoints.CLIENTS + `/${clientId}`);

        for (let project of selectedClient.projects) {
            if (project.projectName === projectName) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1500);
                return;
            }
        }

        fetchWrapper.post(endpoints.PROJECTS, newProjectToAdd)
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