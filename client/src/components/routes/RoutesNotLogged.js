import { Route, Switch } from "react-router-dom";
import HomepageGuest from "../pages/home/HomepageGuest";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/404/PageNotFound";

const RoutesNotLogged = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomepageGuest} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default RoutesNotLogged;
