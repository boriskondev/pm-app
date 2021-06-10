import "./App.css";
import Navigation from "./components/common/navigation/Navigation";
import Main from "./components/common/parts/Main";
import Footer from "./components/common/navigation/Footer";

import RoutesLogged from "./components/routes/RoutesLogged";
import RoutesNotLogged from "./components/routes/RoutesNotLogged";

import {useContext} from "react";
import AuthContext from "./context/AuthContext";

function App() {
    const {loggedIn} = useContext(AuthContext);

    return (
        <div className="App">
            <Navigation/>

            <Main>
                {loggedIn ? <RoutesLogged/> : <RoutesNotLogged/>}
            </Main>

            <Footer/>
        </div>
    );
}

export default App;
