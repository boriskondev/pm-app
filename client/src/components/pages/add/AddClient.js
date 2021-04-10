import Header from "../../common/Header";
import {useState} from "react";
import endpoints from "../../../services/api";
import {useHistory} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../../context/AuthContext";

const AddClient = () => {
    const history = useHistory();
    const { loggedUser } = useContext(AuthContext);

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [clientName, setClientName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClientToAdd = {clientName, createdBy: loggedUser.userId};

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
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newClientToAdd)
        };

        fetch(endpoints.CLIENTS, requestOptions)
            .then(res => res.json())
            .then(() => {
                setSubmitted(true);
                setTimeout(() => {
                    history.push("/")
                }, 1500);
            })
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