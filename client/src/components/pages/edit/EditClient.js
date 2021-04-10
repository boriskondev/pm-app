import Header from "../../common/Header";
import {useEffect, useState} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import {useContext} from "react";

const EditClient = ({match}) => {
    const {id} = match.params;
    const { loggedUser } = useContext(AuthContext);

    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [isNotCreator, setIsNotCreator] = useState(true);

    const [clientName, setClientName] = useState("");

    useEffect(() => {
        fetch(endpoints.CLIENTS + `/${id}`)
            .then(response => response.json())
            .then(data => {
                setClientName(data.clientName)
                setIsNotCreator(data.createdBy !== loggedUser.userId);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const clientToUpdate = {clientName};

        const allClientsInDB = await fetch(endpoints.CLIENTS).then(response => response.json());

        for (let client of allClientsInDB) {
            if (client.clientName === clientName) {
                setError(true);
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
                return;
            }
        }

        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(clientToUpdate)
        };

        fetch(endpoints.CLIENTS + `/${id}`, requestOptions)
            .then(res => res.json())
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.goBack();
                }, 1500);
            })
    }

    return (
        <>
            <Header title="Edit client"/>

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
                            required
                        />
                        {submitted && (<span className="success">Client edited successfully.</span>)}
                        {error && (<span className="error">{clientName} is already registered.</span>)}
                    </div>
                </fieldset>

                { isNotCreator === false && (
                    <button className="add" type="submit">Edit</button>
                ) }

            </form>
        </>
    )
}

export default EditClient;