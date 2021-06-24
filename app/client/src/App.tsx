import React from 'react';
import './App.css';
import { HashRouter, Link, Redirect } from 'react-router-dom';

import AppRoute from './utils/AppRoute';
import LoginForm from './components/LoginForm';
import ProjectDetails from './views/ProjectDetails';

const Home = () => {
  return (
    <div>
      <h1>RDSI Prototype Landing Page</h1>
      <div>
        <h2>
          <Link to="/login">Login Page</Link>
        </h2>
      </div>
      <div>
        <h2>
          <Link to="/details">Project Details</Link>
        </h2>
      </div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppRoute path="/" exact component={Home} />
      <AppRoute path="/login" component={LoginForm} />
      <AppRoute path="/details" component={ProjectDetails} />
      <Redirect to="/" />
    </HashRouter>
  );
}

export default App;
