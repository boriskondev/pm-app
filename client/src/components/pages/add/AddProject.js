import Header from "../../common/Header";
import "./AddTask.css";
import {useState} from "react";
import { clientsOptions } from "./sampleData"

const AddProject = () => {
    const [projectName, setTaskName] = useState("");
    const [clientName, setClientName] = useState("");

    let newProject = {projectName, clientName}

    console.log(newProject);

    return (
        <>
            <Header title="Добави проект"/>

            <form className="create-task-form">

                <div className="form-field">
                    <label>Име</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setTaskName(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Клиент</label>
                    <select
                        onChange={(e) => setClientName(e.target.value)}
                        required
                    >
                        <option hidden>Избери</option>
                        {clientsOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}

                    </select>
                </div>

                <button className="add-task" name="add-task" type="submit">Добави</button>

                {/*<div className="buttons">*/}
                {/*    <button name="edit">Приключи</button>*/}
                {/*    <button name="complete">Редактирай</button>*/}
                {/*    <button name="delete">Изтрий</button>*/}
                {/*</div>*/}

            </form>
        </>
    )
}

export default AddProject;