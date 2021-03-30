// https://marmelab.com/react-admin/Readme.html

import "./App.css";
import {Route, Switch} from "react-router-dom";

import Navigation from "./components/common/Navigation";
import Main from "./components/common/Main";
import Footer from "./components/common/Footer";

import Homepage from "./components/pages/status/Homepage";
import DetailedStatus from "./components/pages/status/DetailedStatus";
import DetailedStatusUser from "./components/pages/status/DetailedStatusUser";

import AddTask from "./components/pages/add/AddTask";
import AddProject from "./components/pages/add/AddProject";
import AddClient from "./components/pages/add/AddClient";

import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

function App() {
    return (
        <div className="App">

            <Navigation/>

            <Main>
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <Route path="/weekly-status" exact component={DetailedStatus}/>
                    <Route path="/weekly-status/:id/:name" exact component={DetailedStatusUser}/>
                    <Route path="/add-task" exact component={AddTask}/>
                    <Route path="/add-project" exact component={AddProject}/>
                    <Route path="/add-client" exact component={AddClient}/>
                    <Route path="/register" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route render={() => <p>Page not found!</p>}/>
                </Switch>
            </Main>

            <Footer/>

        </div>
    );
}

export default App;
