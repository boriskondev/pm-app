import Header from "../../common/Header";
import "./AddTask.css";
import {useState} from "react";
import { clientsOptions, projectsOptions, responsible } from "./sampleData"

const AddTask = () => {
    const [taskName, setTaskName] = useState("");
    const [clientName, setClientName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [peopleResponsible, setPeopleResponsible] = useState([]);

    const filterProjectsOptions = () => {
        // https://www.geeksforgeeks.org/how-to-change-a-selects-options-based-on-another-dropdown-using-react/
    }

    let newTask = {taskName, clientName, projectName, startDate, endDate, peopleResponsible}

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
                        onChange={(e) => setClientName(e.target.value)}
                        required
                    >
                        <option hidden>Избери</option>
                        {clientsOptions.map(option => (
                            <option key={option.id} value={option.id}>{option.label}</option>
                        ))}

                    </select>
                </div>

                <div className="form-field">
                    <label>Проект</label>
                    <select
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    >

                        <option hidden="hidden">Все още хардкоднати - търси се решение</option>
                        <option value="bansko-branding">Bansko branding</option>
                        <option value="sprint-promotion">Spring promotion</option>
                        <option value="emag">EMAG</option>
                        <option value="cash-back">Cash back</option>
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