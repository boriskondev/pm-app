import "./Profile.css";
import Header from "../../common/Header";
import {useState, useEffect, useContext} from "react";
import fetchWrapper from "../../../services/fetchWrapper";
import AuthContext from "../../../context/AuthContext";
import endpoints from "../../../services/api";
import departments from "../../../utils/departments";
import icons from "../../../utils/icons";
import LoadingIndicator from "../../common/LoadingIndicator";
import {Link} from "react-router-dom";

const Profile = () => {
    const {loggedUser} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchWrapper.get(endpoints.USERS + `/${loggedUser.userId}`)
            .then(data => {
                setUserData(data);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <Header title="Profile"/>

            {isLoading && (
                <LoadingIndicator/>
            )}

            {!isLoading && userData && (
                <div className="user-info">
                    <table>
                        <tr>
                            <td>{icons.user}</td>
                            <td>{userData.username}</td>
                        </tr>
                        <tr>
                            <td>{icons.email}</td>
                            <td>{userData.email}</td>
                        </tr>
                        <tr>
                            <td>{icons.department}</td>
                            <td>{departments[userData.department]}</td>
                        </tr>
                    </table>
                    <Link to={`/edit-profile/${userData._id}`}><button className="add">Edit profile</button></Link>
                </div>
            )}
        </>
    )
}

export default Profile;