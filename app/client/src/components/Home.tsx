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
import { Link, useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreState, User, Role } from '../types';

interface HomeProps {
  user: User;
}

const Home: React.FC<HomeProps> = props => {
  const { user } = props;
  const history = useHistory();

  const RedirectUser = () => {
    switch (user.role) {
      case Role.FA:
        history.push('/finance-analyst-dashboard');
        break;
      case Role.Submitter:
      case Role.Executive:
      case Role.Admin:
      case Role.User:
        history.push('/projects');
        break;
      default:
        break;
    }
  };

  if (user) {
    RedirectUser();
  }

  return (
    <Grid container spacing={3} justify="center">
      <Grid item lg={7}>
        <h1>Capstone2021 – RDSI Prototype</h1>
        <h4>
          The goal of the RDSI project is to create a tool for the DIO to use that will replace
          spreadsheets as the primary quarterly project reporting method.
        </h4>
        <h2>Project Objectives include:</h2>
        <li>Apply modern application development methodology based on AGILE principles</li>
        <li>Create a modern web application that is intuitive and easy to use</li>
        <li>Store project and reporting information in a central repository such as a database</li>
        <li>Host the solution in the BC Dev Exchange&apos;s container environment</li>
        <h2>Roles</h2>
        <li>Ministry ‘submitters’ can view project information and provide quarterly updates</li>
        <li>OCIO-DIO staff can analyze Ministry projects and related information</li>
        <li> OCIO executive have access to key trend reports</li>
        <li>Users must login to gain access</li>
        <br />
        <Link to="/about">
          <h2>About</h2>
        </Link>
      </Grid>
    </Grid>
  );
};

const mapState = ({ user }: StoreState): { user: User } => {
  return { user };
};

export default connect(mapState)(Home);
