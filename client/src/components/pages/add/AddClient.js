import Header from "../../common/Header";
import {useState, useContext} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const AddClient = () => {
    const history = useHistory();
    const {loggedUser} = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [clientName, setClientName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClientToAdd = {clientName, createdBy: loggedUser.userId};

        const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);

        for (let client of allClientsInDB) {
            if (client.clientName === clientName) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1500);
                return;
            }
        }

        fetchWrapper.post(endpoints.CLIENTS, newClientToAdd)
            .then((res) => res)
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            });
    }

    return (
        <>
            <Header title="Add client"/>

            <form onSubmit={handleSubmit}>

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
                    {submitted && (<span className="success">{clientName} added successfully.</span>)}
                    {error && (<span className="error">{clientName} is already registered.</span>)}
                </div>

                <button className="add">Add</button>

            </form>
        </>
    )
}

export default AddClient;