import Header from "../../common/Header";
import "./AddTask.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// https://www.positronx.io/react-mern-stack-crud-app-tutorial/
// https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples

const AddClient = () => {
    const [clientName, setClientName] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newClient = {clientName, createdBy: "605a5456b97d5f24dc7c1b38"};

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClient)
        };

        fetch("http://localhost:4000/clients", requestOptions)
            .then(res => res.json())
            .then(data => {console.log(data)})
            .then(() => history.push("/"))
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