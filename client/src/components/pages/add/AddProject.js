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

        if (!projectName || !clientId) {
            setError("All fields are required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const newProjectToAdd = {projectName, clientId, createdBy: loggedUser.userId};

        const selectedClient = await fetchWrapper.get(endpoints.CLIENTS + `/${clientId}`);

        for (let project of selectedClient.projects) {
            if (project.projectName === projectName) {
                setError(`${projectName} is already added.`);
                setTimeout(() => {
                    setError(false);
                }, 1500);
                return;
            }
        }

        fetchWrapper.post(endpoints.PROJECTS, newProjectToAdd)
            .then(() => {
                setSubmitted(`${projectName} added successfully.`);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Add project"/>

            <section className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label>Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>

                    <div className="form-field">
                        <label>Client</label>
                        <select
                            onChange={(e) => setClientId(e.target.value)}
                        >
                            <option hidden>Choose client</option>
                            {clientsOptions && clientsOptions.map(option => (
                                <option key={option._id} value={option._id}>{option.clientName}</option>
                            ))}
                        </select>
                        {submitted && (<span className="success">{submitted}</span>)}
                        {error && (<span className="error">{error}</span>)}
                    </div>

                    <button className="add" type="submit">Add</button>

                </form>
            </section>
        </>
    )
}

export default AddProject;