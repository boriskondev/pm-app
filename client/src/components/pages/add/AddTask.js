import Header from "../../common/Header";
import "./AddTask.css";

const AddTask = () => {
    return (
        <>
            <Header title="Добави задача"/>
            <form className="create-task-form">

                <div className="form-field">
                    <label htmlFor="task-name">Име</label>
                    <input type="text" name="task-name" id="task-name" autoComplete="off" required autoFocus />
                </div>

                <div className="form-field">
                    <label htmlFor="client-name">Клиент</label>
                    <select name="client-name" id="client-name" required>
                        <option value="" selected="selected" hidden="hidden">Избери</option>
                        <option value="visa">Visa</option>
                        <option value="kamenitza">Kamenitza</option>
                        <option value="hp">HP</option>
                        <option value="coca-cola">Coca-Cola</option>
                    </select>
                </div>

                <div className="form-field">
                    <label htmlFor="project-name">Проект</label>
                    <select name="project-name" id="project-name" required>
                        <option value="" selected="selected" hidden="hidden">Избери</option>
                        <option value="bansko-branding">Bansko branding</option>
                        <option value="sprint-promotion">Spring promotion</option>
                        <option value="emag">EMAG</option>
                        <option value="cash-back">Cash back</option>
                    </select>
                </div>

                <div className="form-field dates">
                    <label htmlFor="task-term">Срок</label>
                    <div id="task-term">
                        <input type="date" name="start" id="today" required />
                        <span>-</span>
                        <input type="date" name="end" required />
                    </div>
                </div>

                <div className="form-field">
                    <label htmlFor="persons-responsible">Отговорни</label>
                    <select name="persons-responsible" id="persons-responsible" size="11" multiple required>
                        <option value="1">Боби</option>
                        <option value="2">Веско</option>
                        <option value="3">Данчо</option>
                        <option value="4">Диляна</option>
                        <option value="5">Катя</option>
                        <option value="6">Крис</option>
                        <option value="7">Марто</option>
                        <option value="8">Милена</option>
                        <option value="9">Соня</option>
                        <option value="10">Стефи</option>
                        <option value="11">Хилда</option>
                    </select>
                </div>

                <button className="add-task" name="add-task" type="submit">Добави</button>

                <div className="buttons">
                    <button name="edit">Приключи</button>
                    <button name="complete">Редактирай</button>
                    <button name="delete">Изтрий</button>
                </div>

            </form>
        </>
    )
}

export default AddTask;