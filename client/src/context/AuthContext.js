import {createContext, useEffect, useState} from "react";
import endpoints from "../services/api";
import axios from "axios";

const AuthContext = createContext(undefined);

const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState();

    async function getLoggedIn() {
        const loggedInRes = await axios.get(endpoints.LOGGED_IN);
        setLoggedIn(loggedInRes.data);
    }

    useEffect(async () => {
        await getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};