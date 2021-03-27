import Header from "../../common/Header";
import "./AddTask.css";
import {useState, useEffect} from "react";
import endpoints from "../../../services/api";

const AddProject = () => {
    const [projectName, setProjectName] = useState("");
    const [clientId, setClientId] = useState("");
    const [clientsOptions, setClientsOptions] = useState("");

    useEffect(() => {
        console.log(endpoints.CLIENTS)
        fetch(endpoints.CLIENTS)
            .then(response => response.json())
            .then(data => setClientsOptions(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newProjectToAdd = {projectName, clientId, createdBy: "605a5456b97d5f24dc7c1b38"}

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newProjectToAdd)
        };

        fetch(endpoints.PROJECTS, requestOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
            });

        setProjectName("");
        setClientId("");
    }

    return (
        <>
            <Header title="Добави проект"/>

            <form onSubmit={handleSubmit}>

                <div className="form-field">
                    <label>Име</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Клиент</label>
                    <select
                        onChange={(e) => setClientId(e.target.value)}
                        required
                    >
                        <option hidden>Избери</option>
                        {clientsOptions && clientsOptions.map(option => (
                            <option key={option._id} value={option._id}>{option.clientName}</option>
                        ))}

                    </select>
                </div>

                <button className="add" type="submit">Добави</button>

                {/*<div className="edit-form-buttons">*/}
                {/*    <button name="edit">Приключи</button>*/}
                {/*    <button name="complete">Редактирай</button>*/}
                {/*    <button name="delete">Изтрий</button>*/}
                {/*</div>*/}

            </form>
        </>
    )
}

export default AddProject;