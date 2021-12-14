import "./ProjectData.css";
import editDate from "../../../utils/editDate";
import filterByStatus from "../../../utils/filterByStatus";

const ProjectData = ({ clickedProjectData }) => {
  const status = "active";

  return (
    <>
      {!clickedProjectData && (
        <p>One moment, please, the information is loading :)</p>
      )}

      {clickedProjectData && (
        <>
          <h2>{clickedProjectData.projectName}</h2>

          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>People responsible</th>
                <th>Term</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filterByStatus(clickedProjectData, status).map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>
                    <ul>
                      {task.responsible.map((person) => (
                        <li key={person._id}>{person.username}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {editDate(task.startDate)} - {editDate(task.endDate)}
                  </td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProjectData;
