import React, { LazyExoticComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

type Props = {
  component: LazyExoticComponent<any>;
};

export default ({ component: Component, ...others }: Props) => (
  <Route
    {...others}
    render={
      isLoggedIn() ? () => <Component /> : () => <Redirect to={'/login'} />
    }
  />
);
