import React, { Component } from "react";
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Detail from "./pages/detail/Detail";
import Host from "./pages/host/Host";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Reservation from "./pages/reservation/Reservation2";
import Signup from "./pages/signup/Signup";
import Trips from "./pages/trips/Trips";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/detail/:id" component={Detail} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/list" component={List} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Main} />
        <Route exact path="/reservation" component={Reservation} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/trips" component={Trips} />
      </Switch>
    </Router>
  );
};

export default Routes;