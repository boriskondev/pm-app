import "./App.css";

import {Route, Switch} from "react-router-dom";

import Navigation from "./components/common/Navigation";
import Main from "./components/common/Main";
import Footer from "./components/common/Footer";

import Homepage from "./components/pages/status/Homepage";
import DetailedStatus from "./components/pages/status/DetailedStatus";
import DetailedStatusUser from "./components/pages/status/DetailedStatusUser";

import AddClient from "./components/pages/add/AddClient";
import AddProject from "./components/pages/add/AddProject";
import AddTask from "./components/pages/add/AddTask";

import EditClient from "./components/pages/edit/EditClient";
import EditProject from "./components/pages/edit/EditProject";
import EditTask from "./components/pages/edit/EditTask";

import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

import {AuthContextProvider} from "./context/AuthContext"

function App() {

    return (
        <AuthContextProvider>
            <div className="App">

                <Navigation/>

                <Main>
                    <Switch>
                        <Route path="/" exact component={Homepage}/>
                        <Route path="/weekly-status" exact component={DetailedStatus}/>
                        <Route path="/weekly-status/:id/:name" exact component={DetailedStatusUser}/>
                        <Route path="/edit-client/:id" exact component={EditClient}/>
                        <Route path="/edit-project/:id" exact component={EditProject}/>
                        <Route path="/edit-task/:id" exact component={EditTask}/>
                        <Route path="/add-client" exact component={AddClient}/>
                        <Route path="/add-project" exact component={AddProject}/>
                        <Route path="/add-task" exact component={AddTask}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route render={() => <p>Page not found!</p>}/>
                    </Switch>

                </Main>

                <Footer/>

            </div>
        </ AuthContextProvider>

    );
}

export default App;
