import React from "react";
import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import { useState, useEffect, useContext } from "react";
import absenceTypes from "../../../utils/absenceTypes.js";

function AddAbsence() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const [absencesList, setAbsencesList] = useState(absenceTypes);
  const [absenceType, setAbsenceType] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // console.log(absenceId, details, startDate, endDate);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!absenceType || !startDate || !endDate) {
      setError("First and last fields are required.");
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }

    const startDateToDate = new Date(startDate);
    const endDateToDate = new Date(endDate);

    if (startDateToDate > endDateToDate) {
      setError("Start date cannot be later than the end date.");
      setTimeout(() => {
        setError(false);
      }, 1500);
      return;
    }

    const emailToSend = {
      absenceType,
      startDate,
      endDate,
    };

    console.log(emailToSend);

    // fetchWrapper.post(endpoints.TASKS, newTaskToAdd).then(() => {
    //   setSubmitted(`${taskName} added successfully.`);
    //   setTimeout(() => {
    //     history.push("/");
    //   }, 1500);
    // });
  };
  return (
    <>
      <Header title="Add Absence" />

      <section className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Type</label>
            <select onChange={(e) => setAbsenceType(e.target.value)}>
              <option hidden>Choose absence type</option>
              {absencesList.map((option) => (
                <option key={option._id} value={option.type}>
                  {option.type}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label>Details</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div className="form-field dates">
            <label>Term</label>
            <div id="task-term">
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span>-</span>
              <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>

          <Notifications submitted={submitted} error={error} />

          <button className="add">Add</button>
        </form>
      </section>
    </>
  );
}

export default AddAbsence;
