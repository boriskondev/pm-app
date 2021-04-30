import "./HomepageGuest.css";
import Header from "../../common/Header";
import LoadingIndicator from "../../common/LoadingIndicator";
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";

const HomepageGuest = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [clients, setClients] = useState();
    const [projects, setProjects] = useState();
    const [tasks, setTasks] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const allClientsInDB = await fetchWrapper.get(endpoints.CLIENTS);
            const allProjectsInDB = await fetchWrapper.get(endpoints.PROJECTS);
            const allTasksInDB = await fetchWrapper.get(endpoints.TASKS);

            setClients(allClientsInDB.length);
            setProjects(allProjectsInDB.length);
            setTasks(allTasksInDB.length);
            setIsLoading(false);
        };

        fetchData();

    }, []);

    return (
        <>
            <Header title="Welcome to Mtest 3.0"/>

            <section className="guest-home">

                { isLoading && (
                    <LoadingIndicator />
                ) }

                { clients !== undefined && projects !== undefined && tasks !== undefined && (
                    <div className="status">
                        <ul>
                            <li>Clients: <span>{clients}</span></li>
                            <li>Projects: <span>{projects}</span></li>
                            <li>Tasks: <span>{tasks}</span></li>
                        </ul>
                    </div>
                ) }

                <p>To use the platform you must&nbsp;<Link to="/login"><span>log in</span></Link>
                    &nbsp;or <Link to="/register"><span>register</span></Link>
                    &nbsp;first.</p>

            </section>
        </>
    )
}

export default HomepageGuest;