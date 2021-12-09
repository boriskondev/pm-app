import React from "react";
import Header from "../../common/parts/Header";
import Notifications from "../../common/parts/Notifications";
import { useState, useEffect, useContext } from "react";

function AddAbsence() {
  const [absenceId, setAbsenceId] = useState("");
  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const absenceTypes = [
    { _id: 1, type: "Leave" },
    { _id: 2, type: "Sick leave" },
    { _id: 3, type: "Business trip" },
    { _id: 4, type: "Home office" },
    { _id: 5, type: "Other" },
  ];

  console.log(absenceId, details, startDate, endDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted!");
  };
  return (
    <>
      <Header title="Add Absence" />

      <section className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Type</label>
            <select onChange={(e) => setAbsenceId(e.target.value)}>
              <option hidden>Choose absence type</option>
              {absenceTypes.map((option) => (
                <option key={option._id} value={option._id}>
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

          {/* <Notifications submitted={submitted} error={error} /> */}

          <button className="add">Add</button>
        </form>
      </section>
    </>
  );
}

export default AddAbsence;
