import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import { useState, useContext } from "react";
import endpoints from "../../../services/api";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import fetchWrapper from "../../../services/fetchWrapper";

const AddClient = () => {
  const history = useHistory();
  const { loggedUser } = useContext(AuthContext);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [clientName, setClientName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clientName) {
      setError("The field is required.");
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }

    const newClientToAdd = { clientName, createdBy: loggedUser.userId };

    const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);

    for (let client of allClientsInDB) {
      if (client.clientName === clientName) {
        setError(`${clientName} is already added.`);
        setTimeout(() => {
          setError(false);
        }, 1500);
        return;
      }
    }

    fetchWrapper
      .post(endpoints.CLIENTS, newClientToAdd)
      .then((res) => res)
      .then(() => {
        setSubmitted(`${clientName} added successfully.`);
        setTimeout(() => {
          history.push("/");
        }, 1500);
      });
  };

  return (
    <>
      <Header title="Add client" />

      <section className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              autoComplete="off"
              autoFocus
            />
          </div>

          <Notifications submitted={submitted} error={error} />

          <button className="add">Add</button>
        </form>
      </section>
    </>
  );
};

export default AddClient;
