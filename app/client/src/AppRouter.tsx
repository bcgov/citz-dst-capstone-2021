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
import { HashRouter, Redirect } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import LoginForm from './views/LoginForm';
import SignUpForm from './views/SignUpForm';
import ProjectDetails from './views/ProjectDetails';
import ReportDetails from './views/ReportDetails';
import ProjectList from './views/submitter/ProjectList';
import NewProjectForm from './views/submitter/NewProjectForm';
import SubmitReport from './views/submitter/SubmitReport';
import Home from './components/Home';

const AppRouter: React.FC = () => {
  return (
    <HashRouter>
      <AppRoute path="/" exact component={Home} />
      <AppRoute path="/login" component={LoginForm} />
      <AppRoute path="/signup" component={SignUpForm} />
      <AppRoute requireAuth path="/projects/:cps" component={ProjectDetails} />
      <AppRoute requireAuth exact path="/projects" component={ProjectList} />
      <AppRoute requireAuth path="/view-report/:reportId" component={ReportDetails} />
      <AppRoute requireAuth exact path="/create-project" component={NewProjectForm} />
      <AppRoute requireAuth path="/submit-report/:projectId" component={SubmitReport} />
      <Redirect to="/" />
    </HashRouter>
  );
};

export default AppRouter;
