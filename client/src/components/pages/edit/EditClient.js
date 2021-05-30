import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import {useEffect, useState, useContext} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";
import LoadingIndicator from "../../common/parts/LoadingIndicator";

const EditClient = ({match}) => {
    const {id} = match.params;
    const {loggedUser} = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isNotCreator, setIsNotCreator] = useState(true);

    const [clientName, setClientName] = useState("");

    useEffect(() => {
        fetchWrapper.get(endpoints.CLIENTS + `/${id}`)
            .then(data => {
                setClientName(data.clientName);
                setIsNotCreator(data.createdBy !== loggedUser.userId);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientName) {
            setError("The field is required.");
            setTimeout(() => {
                setError(false);
            }, 1500);
            return;
        }

        const clientToUpdate = {clientName};

        const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);

        for (let client of allClientsInDB) {
            if (client.clientName === clientName) {
                setError(`${clientName} is already added.`);
                setTimeout(() => {
                    setError(false);
                }, 1500);
                return;
            }
        }

        fetchWrapper.put(endpoints.CLIENTS + `/${id}`, clientToUpdate)
            .then(() => {
                setSubmitted(`${clientName} edited successfully.`);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            })
    }

    if (isLoading) {
        return (
            <>
                <Header title="Edit client"/>
                <LoadingIndicator/>
            </>
        )
    }

    return (
        <>
            <Header title="Edit client"/>

            <section className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <fieldset disabled={isNotCreator}>
                        <div className="form-field">
                            <label>Name</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                autoComplete="off"
                                autoFocus
                            />
                        </div>
                    </fieldset>

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

export default EditClient;