import "./HomepageLoggedIn.css";
import Header from "../../common/parts/Header";
import {Link} from "react-router-dom";
import endpoints from "../../../services/api";
import countTasksOfUser from "../../../utils/countTasksOfUser";
import icons from "../../../utils/icons";
import LoadingIndicator from "../../common/parts/LoadingIndicator";
import fetchWrapper from "../../../services/fetchWrapper";
import NoTasksYet from "../../common/parts/NoTasksYet";
import {useState, useEffect} from "react";

const HomepageLoggedIn = () => {
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [currentSort, setCurrentSort] = useState("sortDefault");
    const [isLoading, setIsLoading] = useState(true);

    const filterData = (users, activeTasks) => {
        let data = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (countTasksOfUser(user._id, activeTasks) > 0) {
                let userData = {
                    _id: user._id,
                    username: user.username,
                    currentTasks: countTasksOfUser(user._id, activeTasks),
                    department: user.department
                }
                data.push(userData);
            }
        }
        return data;
    }

    const sortTypes = {
        sortUp: {
            class: "sort-up",
            fn: (a, b) => a.currentTasks - b.currentTasks
        },
        sortDown: {
            class: "sort-down",
            fn: (a, b) => b.currentTasks - a.currentTasks
        },
        sortDefault: {
            class: "sort",
            fn: (a, b) => a
        }
    };

    const onSortChange = () => {
        let nextSort;
        if (currentSort === "sortDown") nextSort = "sortUp";
        else if (currentSort === "sortUp") nextSort = "sortDefault";
        else if (currentSort === "sortDefault") nextSort = "sortDown";

        setCurrentSort(nextSort);
    };

    useEffect(() => {
        const fetchData = async () => {
            const allUsersInDB = await fetchWrapper.get(endpoints.USERS);
            const allTasksInDB = await fetchWrapper.get(endpoints.TASKS);

            setIsLoading(false);
            setActiveTasks(allTasksInDB);
            setDataToDisplay(filterData(allUsersInDB, allTasksInDB));

        };

        fetchData();

    }, []);


    if (isLoading) {
        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <LoadingIndicator/>
            </>

        )
    }

    if (dataToDisplay.length === 0) {
        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <NoTasksYet/>
            </>
        )
    }

    if (!isLoading && dataToDisplay.length > 0) {
        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <section className="weekly-overview">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>
                                Tasks
                                    <i className="sort-icon" onClick={(e) => onSortChange(e)}>{icons[currentSort]}</i>
                            </th>
                            <th>Department</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dataToDisplay.sort(sortTypes[currentSort].fn).map(user => (
                            <tr key={user._id}>
                                <td><Link
                                    to={`weekly-status/${user._id}/${user.username}`}>{user.username}</Link>
                                </td>
                                <td>{user.currentTasks}</td>
                                <td className="homepage-icon">{icons[user.department]}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <td></td>
                            <td>{activeTasks.length}</td>
                            <td></td>
                        </tr>
                        </tfoot>
                    </table>
                </section>
            </>
        )
    }
}

export default HomepageLoggedIn;

