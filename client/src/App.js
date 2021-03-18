import "./App.css";
import { Route, Link, NavLink, Switch } from "react-router-dom";

import Navigation from "./components/common/Navigation";
import Main from "./components/common/Main";
import Footer from "./components/common/Footer";

import Header from "./components/common/Header";
import Homepage from "./components/pages/Homepage";
import WeeklyStatus from "./components/pages/WeeklyStatus";
// import Data from "./components/Data";



function App() {

    return (
        <div className="App">

            <Navigation />

            <Main>
                <Header title="Седмичен обзор" />
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/weekly-status" exact component={WeeklyStatus}/>
                    <Route render={() => <p>Page not found!</p>}/>
                </Switch>
            </ Main>

            {/*<Data />*/}

            <Footer />

        </div>
    );
}

export default App;
