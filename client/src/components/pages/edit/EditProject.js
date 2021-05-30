import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import {useState, useEffect, useContext} from "react";
import {useHistory} from "react-router-dom";
import endpoints from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";
import LoadingIndicator from "../../common/parts/LoadingIndicator";

const AddProject = ({match}) => {
    const {id} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false)
        };

        fetchData();

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

        const projectToUpdate = {projectName, clientId};

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

        fetchWrapper.put(endpoints.PROJECTS + `/${id}`, projectToUpdate)
            .then(() => {
                setSubmitted(`${projectName} edited successfully.`);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            });
    }

    if (isLoading) {
        return (
            <>
                <Header title="Edit project"/>
                <LoadingIndicator/>
            </>
        )
    }

    return (
        <>
            <Header title="Edit project"/>

            <section className="form-wrapper">
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
                            />
                        </div>
                    </fieldset>


                    <div className="form-field">
                        <label>Client</label>
                        <select
                            onChange={(e) => setClientId(e.target.value)}
                        >
                            <option hidden>{clientName}</option>
                            {clientsOptions && clientsOptions.map(option => (
                                <option key={option._id} value={option._id}>{option.clientName}</option>
                            ))}
                        </select>
                    </div>

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

export default AddProject;