import './App.css';

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { GlobalStoreProvider, useUserInfo } from './Contexts/GlobalContext';
import { ACTIONS as USER_ACTIONS } from './Reducers/UserInfoReducer';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';

const useStyles = makeStyles((theme) => ({
  header: {
    '& > p': {
      margin: '0',
    },
  },
  logoutButton: {
    marginTop: '8px',
    color: '#a6d4fa',
  },
}));

function App() {
  const [user, dispatchUserInfo] = useUserInfo();
  const classes = useStyles();

  const handleLogoutClicked = () => {
    dispatchUserInfo({type: USER_ACTIONS.LOGOUT});
  };

  return (
    <div className="App">
      <header className={clsx("App-header", classes.header)}>
        <p>Simple React App for ECOLUX</p>
        {user.name !== '' &&
          <Button className={classes.logoutButton} onClick={handleLogoutClicked}>{`Hi ${user.name}, Logout`}</Button>
        }
      </header>
      <main className="App-main">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </main>
      <footer className="App-footer">
        <p>By Max Chen</p>
      </footer>
    </div>
  );
}

function AppWithGlobalStore() {
  return (
    <GlobalStoreProvider>
      <App />
    </GlobalStoreProvider>
  );
}

export default AppWithGlobalStore;
