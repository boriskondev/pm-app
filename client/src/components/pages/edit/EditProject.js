import Header from "../../common/Header";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const AddProject = ({match}) => {
    const {id} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [isNotCreator, setIsNotCreator] = useState(true);

    const [projectName, setProjectName] = useState("");
    const [clientName, setClientName] = useState("");
    const [clientId, setClientId] = useState("");
    const [clientsOptions, setClientsOptions] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const currentProjectData = await fetchWrapper.get(endpoints.PROJECTS + `/${id}`);
            const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);

            setProjectName(currentProjectData.projectName);
            setClientName(currentProjectData.clientId.clientName);
            setIsNotCreator(currentProjectData.createdBy !== loggedUser.userId);
            setClientId(currentProjectData.clientId._id);
            setClientsOptions(allClientsInDB);
        };

        fetchData();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectToUpdate = {projectName, clientId};

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

        fetchWrapper.put(endpoints.PROJECTS + `/${id}`, projectToUpdate)
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Edit project"/>

            <form onSubmit={handleSubmit}>
                <fieldset disabled={isNotCreator}>
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
                </fieldset>


                <div className="form-field">
                    <label>Client</label>
                    <select
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    >
                        <option hidden>{clientName}</option>
                        {clientsOptions && clientsOptions.map(option => (
                            <option key={option._id} value={option._id}>{option.clientName}</option>
                        ))}
                    </select>
                    {submitted && (<span className="success">Project edited successfully.</span>)}
                    {error && (<span className="error">{projectName} is already registered.</span>)}
                </div>

                {isNotCreator === false && (
                    <button className="add" type="submit">Edit</button>
                )}

            </form>
        </>
    )
}

export default AddProject;