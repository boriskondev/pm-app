import {createContext, useEffect, useState} from "react";
import endpoints from "../services/api";
import axios from "axios";

const AuthContext = createContext(undefined);

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState();
    const [loggedUser, setLoggedUser] = useState();

    async function getLoggedIn() {
        const loggedInRes = await axios.get(endpoints.LOGGED_IN);
        const loggedUserInfo = await axios.get(endpoints.LOGGED_USER);
        setLoggedIn(loggedInRes.data);
        setLoggedUser(loggedUserInfo.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn, loggedUser }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};