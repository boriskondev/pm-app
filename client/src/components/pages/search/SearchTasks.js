import {useState, useEffect} from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import endpoints from "../../../services/api";
import Header from "../../common/parts/Header";
import LoadingIndicator from "../../common/parts/LoadingIndicator";
import SearchBar from "../../common/parts/SearchBar";
import "./SearchTasks.css";
import SearchTasksCard from "./SearchTasksCard";

const SearchTasks = () => {
    const [input, setInput] = useState("");
    const [tasksListDefault, setTasksListDefault] = useState([]);
    const [tasksList, setTasksList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        return await fetchWrapper.get(endpoints.TASKS_ALL)
            .then(data => {
                setTasksList(data);
                setTasksListDefault(data);
                setIsLoading(false);
            });
    }

    const updateInput = async (input) => {
        const filtered = tasksListDefault.filter(task => {
            return task.taskName.toLowerCase().includes(input.toLowerCase());
        })
        setInput(input);
        setTasksList(filtered);
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (isLoading) {
        return (
            <>
                <Header title="Search tasks"/>
                <LoadingIndicator/>
            </>

        )
    }

    return (
        <>
            <Header title="Search tasks"/>
            <section className="search-wrapper">
                <SearchBar
                    input={input}
                    updateInput={updateInput}
                    placeholder="Enter task name"
                    onChange={(e) => updateInput(e.target.value)}
                />

                <div className="search-result-tasks">
                    {tasksList && tasksList.length > 0
                        ? tasksList.map(task => (
                            <SearchTasksCard task={task}/>
                        ))
                        : (
                            <div className="notifications">
                                <span className="error">No results found :(</span>
                            </div>
                        )}
                </div>
            </section>
        </>
    )
}

export default SearchTasks;