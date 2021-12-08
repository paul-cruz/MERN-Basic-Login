import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Profile from './views/Profile';
import ForgotPassword from './views/ForgotPassword';
import ResetPassword from './views/ResetPassword';

const Routes = () => (
  <div>
    <Switch>
      <Redirect exact from='/' to='/login' />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/reset/:token" component={ResetPassword} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/userProfile/:name" component={Profile} />
    </Switch>
  </div>
);

export default Routes;
