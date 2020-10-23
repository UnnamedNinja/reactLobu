import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../../components/dashboard/dashboard'

const AuthenticatedRoutes = () => (
  <Switch>
    <Route exact path="/dashboard" component={() =><Dashboard/>} />
  </Switch>
);

export default AuthenticatedRoutes;
