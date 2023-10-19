import './App.css';

import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/NotFound';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>Simple React App for ECOLUX</p>
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

export default App;
