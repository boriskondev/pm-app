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
    const [users, setUsers] = useState([]);
    const [activeTasks, setActiveTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // const filterData = (users, activeTasks) => {
    //     let data = [];
    //     for (let i = 0; i < users.length; i++) {
    //         let user = users[i];
    //         if (countTasksOfUser(user._id, activeTasks) > 0) {
    //             let userData = {
    //                 _id: user._id,
    //                 username: user.username,
    //                 currentTasks: countTasksOfUser(user._id, activeTasks),
    //                 department: user.department
    //             }
    //             data.push(userData);
    //         }
    //     }
    //     return data;
    // }
    //
    // const result = filterData(users, activeTasks);

    useEffect(() => {
        const fetchData = async () => {
            const allUsersInDB = await fetchWrapper.get(endpoints.USERS);
            const allTasksInDB = await fetchWrapper.get(endpoints.TASKS);

            setUsers(allUsersInDB);
            setActiveTasks(allTasksInDB);
            setIsLoading(false);
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

    if (activeTasks.length === 0) {
        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <NoTasksYet/>
            </>
        )
    }

    if (!isLoading && activeTasks.length > 0) {
        return (
            <>
                <Link to="/weekly-status"><Header title="Overview"/></Link>
                <section className="weekly-overview">
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tasks</th>
                            <th>Department</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users && (
                            users.map(user => (
                                countTasksOfUser(user._id, activeTasks) > 0
                                    ? (
                                        <tr key={user._id}>
                                            <td><Link
                                                to={`weekly-status/${user._id}/${user.username}`}>{user.username}</Link>
                                            </td>
                                            <td>{countTasksOfUser(user._id, activeTasks)}</td>
                                            <td className="homepage-icon">{icons[user.department]}</td>
                                        </tr>
                                    )
                                    : null
                            )))}
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

