import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import { Layout } from '../layout/Layout';

interface IAppRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const AppRoute: React.FC<IAppRouteProps> = (props) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={routeProps => (
        <Layout>
          <Component {...routeProps}/>
        </Layout>
      )}
    />
  )
}

export default AppRoute;
