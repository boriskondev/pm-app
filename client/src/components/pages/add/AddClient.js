import Header from "../../common/Header";
import "./AddTask.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import baseUrl from "../../../services/api";

// https://www.positronx.io/react-mern-stack-crud-app-tutorial/
// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

const AddClient = () => {
    const [clientName, setClientName] = useState("");
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClientToAdd = { clientName, createdBy: "605a5456b97d5f24dc7c1b38" };

        const allClientsInDB = await fetch(baseUrl.clients).then(response => response.json());

        for (let client of allClientsInDB){
            if (allClientsInDB[client].clientName === clientName){
                console.log("This client is already registered.");
                return;
            }
        }

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClientToAdd)
        };

        fetch(baseUrl.clients, requestOptions)
            .then(res => res.json())
            .then(data => {console.log(data)})
            .then(() => setClientName(""));
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

                {/*<div className="edit-form-buttons">*/}
                {/*    <button name="edit">Приключи</button>*/}
                {/*    <button name="complete">Редактирай</button>*/}
                {/*    <button name="delete">Изтрий</button>*/}
                {/*</div>*/}

            </form>
        </>
    )
}

export default AddClient;