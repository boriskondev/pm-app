import Header from "../../common/Header";
import "./AddTask.css";
import { useState } from "react";

const AddClient = () => {
    const [clientName, setClientName] = useState("");

    let newClient = { clientName }

    console.log(newClient);

    return (
        <>
            <Header title="Добави клиент"/>

            <form className="create-task-form">

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

export default AddClient;