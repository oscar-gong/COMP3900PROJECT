import React, { useContext } from 'react';
import "./App.css";
import { Redirect, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./styles/Main";
import Login from "./pages/Login";
import RegisterDiner from "./pages/RegisterDiner";
import RegisterEatery from "./pages/RegisterEatery";
import DinerLanding from "./pages/DinerLanding";
import EateryLanding from "./pages/EateryLanding";
import EateryProfile from "./pages/EateryProfile";
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { StoreContext } from './utils/store';
import DinerProfile from './pages/DinerProfile';

function App() {
  const context = useContext(StoreContext);
  console.log(context);
  const [alertOptions, setAlertOptions] = context.alert;

  return (
    <>
      <Snackbar open={alertOptions.showAlert} autoHideDuration={6000} onClose={() => setAlertOptions({ ...alertOptions, showAlert: false })}>
        <Alert onClose={() => setAlertOptions({ ...alertOptions, showAlert: false })} severity={alertOptions.variant}>
          {alertOptions.message}
        </Alert>
      </Snackbar>
      <Main>
        <Router>
          <Switch>
            <Route exact path="/DinerLanding">
              <DinerLanding />
            </Route>
            <Route exact path="/dinerProfile">
              <DinerProfile />
            </Route>
            <Route exact path="/">
              <Default />
            </Route>
            <Route exact path="/Login">
              <Login />
            </Route>
            <Route exact path="/RegisterDiner">
              <RegisterDiner />
            </Route>
            <Route exact path="/RegisterEatery">
              <RegisterEatery />
            </Route>
            <Route path="/EateryProfile">
              <EateryProfile />
            </Route>
            <Route exact path="/EateryLanding">
              <EateryLanding />
            </Route>
          </Switch>
        </Router>
      </Main>
    </>
  );
}

const Default = () => {
  const context = useContext(StoreContext);
  const [auth] = context.auth;
  const [isDiner] = context.isDiner;
  console.log(auth);
  if (auth === null) return <Redirect to="/Login" />;
  if (isDiner === "false") return <Redirect to="/EateryLanding" />;
  if (isDiner === "true") return <Redirect to="/DinerLanding" />;
}

export default App;
