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
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router-dom';

import Layout from '../layout/Layout';
import { StoreState, User } from '../types';
import LoginForm from '../views/LoginForm';

interface IAppRouteProps extends RouteProps {
  requireAuth?: boolean;
  component: React.ComponentType<any>;
  user?: User;
}

const AppRoute: React.FC<IAppRouteProps> = props => {
  const { requireAuth, component: Component, user, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => (
        <Layout>
          {requireAuth && !user?.email ? <LoginForm /> : <Component {...routeProps} />}
        </Layout>
      )}
    />
  );
};

const mapState = ({ user }: StoreState) => {
  return { user };
};

export default connect(mapState)(AppRoute);
