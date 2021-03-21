import Header from "../../common/Header";
import "./AddTask.css";
import {useState} from "react";
import { clientsOptions, projectsOptions, responsible } from "./sampleData"

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [clientId, setClientId] = useState("");
    const [projectId, setProjectId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [peopleResponsible, setPeopleResponsible] = useState([]);

    const filterProjectsOptions = (projectsPerClient, clientId) => {
        let result = projectsPerClient.filter(client => (client.clientId === clientId));
        console.log(result)
    }

    let newTask = {taskName, clientId, projectId, startDate, endDate, peopleResponsible}

    console.log(newTask);

    return (
        <>
            <Header title="Добави задача"/>

            <form className="create-task-form">

                <div className="form-field">
                    <label>Име</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
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
                        <option hidden>Избери клиент</option>

                        {clientsOptions.map(client => (
                            <option key={client.id} value={client.id}>{client.label}</option>
                        ))}

                    </select>
                </div>

                <div className="form-field">
                    <label>Проект</label>
                    <select
                        onChange={(e) => setProjectId(e.target.value)}
                        required
                    >

                        <option hidden="hidden">Избери проект</option>
                        { projectsOptions.filter(project => (project.clientId === 4)).map(filtered => (
                            <option key={filtered.projectId} value={filtered.projectId}>{filtered.projectName}</option>
                        )) }

                    </select>
                </div>

                <div className="form-field dates">
                    <label>Срок</label>
                    <div id="task-term">
                        <input
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                        <span>-</span>
                        <input
                            type="date"
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label>Отговорни</label>
                    <select
                        onClick={(e) => setPeopleResponsible(responsible => new Set([...responsible, e.target.value]))}
                        size={responsible.length}
                        multiple
                        required
                    >

                        {responsible.map(option => (
                            <option
                                key={option.id}
                                value={option.id}
                            >
                                {option.name}
                            </option>
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

export default AddTask;