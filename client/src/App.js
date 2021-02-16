import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Check from './components/check/Check';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Holidays from './components/holiday/Holidays';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { loadUser, loadProfile } from './actions/auth';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadProfile());
  }, []);
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={ Login }></Route>
            <PrivateRoute exact path="/dashboard" component={ Check }></PrivateRoute>
            <PrivateRoute exact path="/profiles" component={ Profiles }></PrivateRoute>
            <PrivateRoute exact path="/profile/:id" component={ Profile }></PrivateRoute>
            <PrivateRoute exact path="/holidays" component={ Holidays }></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;
