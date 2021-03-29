import Header from "../../common/Header";
import "./AddTask.css";
import {useState} from "react";
import endpoints from "../../../services/api";
// import { useHistory } from "react-router-dom";

// https://www.codementor.io/@blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
// https://www.positronx.io/react-mern-stack-crud-app-tutorial/
// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
// https://jasonwatmore.com/post/2020/10/09/react-crud-example-with-react-hook-form
// https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-3/
// https://www.pluralsight.com/guides/handling-nested-http-requests-using-the-fetch-api
// https://stackoverflow.com/questions/55938936/any-approach-to-send-post-request-for-checking-and-inserting-values-in-mongodb-i

// Нотификации за успешно добавяне и грешки!

const AddClient = () => {
    const [clientName, setClientName] = useState("");
    // const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClientToAdd = {clientName, createdBy: "605a5456b97d5f24dc7c1b38"};

        const allClientsInDB = await fetch(endpoints.CLIENTS).then(response => response.json());

        for (let client of allClientsInDB) {
            if (client.clientName === clientName) {
                console.log("This client is already registered.");
                setClientName("");
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
            .then(data => {
                console.log(data)
            });

        setClientName("");
    }

    return (
        <>
            <Header title="Добави клиент"/>

            <form onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Име</label>
                    <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                </div>

                <button className="add">Добави</button>

            </form>
        </>
    )
}

export default AddClient;