import {useState, useEffect} from "react";
import Header from "../../common/parts/Header";
import SearchBar from "../../common/parts/SearchBar";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";
import {Link} from "react-router-dom";
import "./SearchProjects.css";
import LoadingIndicator from "../../common/parts/LoadingIndicator";

const SearchProjects = () => {
    const [input, setInput] = useState("");
    const [projectsListDefault, setProjectsListDefault] = useState([]);
    const [projectsList, setProjectsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        return await fetchWrapper.get(endpoints.PROJECTS)
            .then(data => {
                setProjectsList(data);
                setProjectsListDefault(data);
                setIsLoading(false);
            });
    }

    const updateInput = async (input) => {
        const filtered = projectsListDefault.filter(project => {
            return project.projectName.toLowerCase().includes(input.toLowerCase());
        })
        setInput(input);
        setProjectsList(filtered);
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (isLoading) {
        return (
            <>
                <Header title="Search projects"/>
                <LoadingIndicator/>
            </>

        )
    }

    return (
        <>
            <Header title="Search projects"/>
            <section className="search-wrapper">
                <SearchBar
                    input={input}
                    updateInput={updateInput}
                    placeholder="Enter project name"
                    onChange={(e) => updateInput(e.target.value)}
                />

                <div className="search-result">
                    {projectsList && projectsList.length > 0
                        ? projectsList.map(project => (
                            <Link
                                style={{textDecoration: "none"}}
                                to={`/edit-project/${project._id}`}>
                                <div className="result-card">
                                    <p>{project.projectName}</p>
                                    <p className="result-card-client">{project.clientId.clientName}</p>
                                </div>
                            </Link>
                        ))
                        : (
                            <div className="notifications">
                                <span className="error">No results found :(</span>
                            </div>
                        )}
                </div>
            </section>
        </>
    );
}

export default SearchProjects;