import "./ProjectsStatus.css";
import Header from "../../common/Header";
import NoTasksYet from "../../common/NoTasksYet";
import ProjectData from "./ProjectData";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import filterClientsAndProjects from "../../../utils/filterClientsAndProjects";
import fetchWrapper from "../../../services/fetchWrapper";
import LoadingIndicator from "../../common/LoadingIndicator";
import {useState, useEffect} from "react";

const ProjectsStatus = () => {
    const [weeklyData, setWeeklyData] = useState([]);
    const [projectNotClicked, setProjectNotClicked] = useState(true);
    const [projectClickedData, setProjectClickedData] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchWrapper.get(endpoints.TASKS)
            .then(data => {
                setWeeklyData(filterClientsAndProjects(data));
                setActiveTasks(data);
                setIsLoading(false);
            });
    }, []);

    const handleAccordionClick = (e) => {
        let accordion = e.target;
        accordion.classList.toggle("active");
        let accordionPanel = accordion.nextElementSibling;
        if (accordionPanel.style.display === "block") {
            accordionPanel.style.display = "none";
        } else {
            accordionPanel.style.display = "block";
        }
    }

    const handlePanelClick = (e, id) => {
        fetchWrapper.get(endpoints.PROJECTS + `/${id}`)
            .then(data => {
                setProjectClickedData(data);
                setProjectNotClicked(false);
            });
    }

    const sidebarData = weeklyData.map(client => (
        <article key={client._id}>
            <button className="project-accordion"
                    onClick={(e) => handleAccordionClick(e)}
            >
                {client.clientName}
            </button>
            <div className="project-panel">
                <ul>
                    {client.projects.map(project => (
                        <li key={project._id} value={project._id}
                            onClick={(e) => handlePanelClick(e, project._id)}>
                            <Link>{project.projectName}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    ));

    if (isLoading) {
        return (
            <>
                <Header title="Detailed overview"/>
                <LoadingIndicator/>
            </>

        )
    }

    if (activeTasks.length === 0) {
        return (
            <>
                <Header title="Detailed overview"/>
                <NoTasksYet/>
            </>
        )
    }

    if (!isLoading && activeTasks.length > 0) {
        return (
            <>
                <Header title="Detailed overview"/>

                <section className="content-wrapper">

                    <section className="projects-list">
                        {sidebarData}
                    </section>

                    <section className="project-info">

                        {projectNotClicked && activeTasks.length > 0 && (
                            <div className="message">
                                <p>This
                                    week <span>{activeTasks.length}</span> {activeTasks.length === 1 ? "task is" : "tasks are"} waiting
                                    for us.</p>
                                <p>Choose client and project and let's begin :)</p>
                            </div>
                        )}

                        {!projectNotClicked && activeTasks && (
                            <ProjectData clickedProjectData={projectClickedData}/>
                        )}

                    </section>

                </section>
            </>
        )
    }
}

export default ProjectsStatus;