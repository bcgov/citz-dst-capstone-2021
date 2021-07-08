//
// Copyright © 2020 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

import React from 'react';
import './App.css';
import { HashRouter, Link, Redirect } from 'react-router-dom';

import AppRoute from './utils/AppRoute';
import LoginForm from './views/LoginForm';
import ProjectDetails from './views/ProjectDetails';
import SignUpForm from './views/SignUpForm';
import ProjectList from './views/submitter/ProjectList';
import NewProjectForm from './views/submitter/NewProjectForm';
import SubmitReport from './views/submitter/SubmitReport';

const Home = () => {
  return (
    <div>
      <h1>Capstone2021 – RDSI Prototype</h1>
      <h4>
        The goal of the RDSI project is to create a tool for the DIO to use that
        will replace spreadsheets as the primary quarterly project reporting
        method.
      </h4>
      <h2>Project Objectives include:</h2>
      <li>
        Apply modern application development methodology based on AGILE
        principles
      </li>
      <li>Create a modern web application that is intuitive and easy to use</li>
      <li>
        Store project and reporting information in a central repository such as
        a database
      </li>
      <li>
        Host the solution in the BC Dev Exchange&apos;s container environment
      </li>
      <h2>Roles</h2>
      <li>
        Ministry ‘submitters’ can view project information and provide quarterly
        updates
      </li>
      <li>
        OCIO-DIO staff can analyze Ministry projects and related information
      </li>
      <li> OCIO executive have access to key trend reports</li>
      <li>Users must login to gain access</li>
      <br />
      <div>
        <h3>
          <Link to="/projects"> Submitter&apos;s Project List</Link>
        </h3>
        <h3>
          <Link to="/create-project">
            Submitter&apos;s New Project Form (WIP)
          </Link>
        </h3>
      </div>
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AppRoute path="/" exact component={Home} />
      <AppRoute path="/login" component={LoginForm} />
      <AppRoute path="/signup" component={SignUpForm} />
      <AppRoute requireAuth path="/projects/:cps" component={ProjectDetails} />
      <AppRoute requireAuth exact path="/projects" component={ProjectList} />
      <AppRoute
        requireAuth
        exact
        path="/create-project"
        component={NewProjectForm}
      />
      <AppRoute path="/submit-report/:cps" component={SubmitReport} />
      <Redirect to="/" />
    </HashRouter>
  );
}

export default App;
