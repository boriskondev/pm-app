import "./SearchTasksCard.css";
import { Link } from "react-router-dom";

const SearchTasksCard = ({ task }) => {
  return (
    <div className="result-card-task">
      <div className="result-card-task-details">
        <p>{task.taskName}</p>
        <div className="result-card task-client-and-project">
          <p className="result-client">{task.clientId.clientName}</p>
          <p className="result-project">{task.projectId.projectName}</p>
        </div>
      </div>
      {task.status === "complete" ? (
        <p className="status complete">{task.status}</p>
      ) : (
        <p className="status active">
          <Link
            to={`/edit-task/${task._id}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            {task.status}
          </Link>
        </p>
      )}
    </div>
  );
};

export default SearchTasksCard;
