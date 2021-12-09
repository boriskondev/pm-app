import { Route, Switch } from "react-router-dom";
import HomepageUser from "../pages/home/HomepageUser";
import ProjectsStatus from "../pages/status/ProjectsStatus";
import UserStatus from "../pages/status/UserStatus";
import EditClient from "../pages/edit/EditClient";
import EditProject from "../pages/edit/EditProject";
import EditTask from "../pages/edit/EditTask";
import AddClient from "../pages/add/AddClient";
import AddProject from "../pages/add/AddProject";
import AddTask from "../pages/add/AddTask";
import AddAbsence from "../pages/add/AddAbsence";
import Profile from "../pages/profile/Profile";
import EditProfile from "../pages/profile/EditProfile";
import SearchClients from "../pages/search/SearchClients";
import SearchProjects from "../pages/search/SearchProjects";
import SearchTasks from "../pages/search/SearchTasks";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/404/PageNotFound";

const RoutesLogged = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomepageUser} />
      <Route path="/weekly-status" exact component={ProjectsStatus} />
      <Route path="/weekly-status/:id/:name" exact component={UserStatus} />
      <Route path="/edit-client/:id" exact component={EditClient} />
      <Route path="/edit-project/:id" exact component={EditProject} />
      <Route path="/edit-task/:id" exact component={EditTask} />
      <Route path="/add-client" exact component={AddClient} />
      <Route path="/add-project" exact component={AddProject} />
      <Route path="/add-task" exact component={AddTask} />
      <Route path="/add-absence" exact component={AddAbsence} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/edit-profile/:id" exact component={EditProfile} />
      <Route path="/search-clients" exact component={SearchClients} />
      <Route path="/search-projects" exact component={SearchProjects} />
      <Route path="/search-tasks" exact component={SearchTasks} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default RoutesLogged;
