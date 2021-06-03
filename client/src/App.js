import "./App.css";

import {Route, Switch} from "react-router-dom";

import Navigation from "./components/common/navigation/Navigation";
import Main from "./components/common/parts/Main";
import Footer from "./components/common/navigation/Footer";

import HomepageGuest from "./components/pages/home/HomepageGuest";
import HomepageUser from "./components/pages/home/HomepageUser";

import ProjectsStatus from "./components/pages/status/ProjectsStatus";
import UserStatus from "./components/pages/status/UserStatus";

import AddClient from "./components/pages/add/AddClient";
import AddProject from "./components/pages/add/AddProject";
import AddTask from "./components/pages/add/AddTask";

import EditClient from "./components/pages/edit/EditClient";
import EditProject from "./components/pages/edit/EditProject";
import EditTask from "./components/pages/edit/EditTask";

import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";

import Profile from "./components/pages/profile/Profile";
import EditProfile from "./components/pages/profile/EditProfile";

import SearchClients from "./components/pages/search/SearchClients";
import SearchProjects from "./components/pages/search/SearchProjects";
import SearchTasks from "./components/pages/search/SearchTasks";

import PageNotFound from "./components/pages/404/PageNotFound";

import {useContext} from "react";
import AuthContext from "./context/AuthContext";

function App() {
    const {loggedIn} = useContext(AuthContext);

    return (
        <div className="App">

            <Navigation/>

            {loggedIn === false && (
                <Main>
                    <Switch>
                        <Route path="/" exact component={HomepageGuest}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                    </Switch>
                </Main>
            )
            }

            {loggedIn === true && (
                <Main>
                    <Switch>
                        <Route path="/" exact component={HomepageUser}/>
                        <Route path="/weekly-status" exact component={ProjectsStatus}/>
                        <Route path="/weekly-status/:id/:name" exact component={UserStatus}/>
                        <Route path="/edit-client/:id" exact component={EditClient}/>
                        <Route path="/edit-project/:id" exact component={EditProject}/>
                        <Route path="/edit-task/:id" exact component={EditTask}/>
                        <Route path="/add-client" exact component={AddClient}/>
                        <Route path="/add-project" exact component={AddProject}/>
                        <Route path="/add-task" exact component={AddTask}/>
                        <Route path="/profile" exact component={Profile}/>
                        <Route path="/edit-profile/:id" exact component={EditProfile}/>
                        <Route path="/search-clients" exact component={SearchClients}/>
                        <Route path="/search-projects" exact component={SearchProjects}/>
                        <Route path="/search-tasks" exact component={SearchTasks}/>
                        <Route path="/register" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Main>
            )}

            <Footer/>

        </div>

    );
}

export default App;
