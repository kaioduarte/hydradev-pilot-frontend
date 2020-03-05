import React, { Suspense, lazy, useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { AuthContext } from './contexts/auth';
import { LOGIN, COLLECTIONS } from './routes';

const MainLayout = lazy(() => import('./layouts/main'));
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));

function App() {
  const location = useLocation();
  const { userInfo } = useContext(AuthContext);
  const { isUserLoggedIn } = userInfo;

  if (isUserLoggedIn && location.pathname === LOGIN) {
    return <Redirect to={COLLECTIONS} />;
  }

  if (!isUserLoggedIn && location.pathname !== LOGIN) {
    return <Redirect to={LOGIN} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route component={MainLayout} />
      </Switch>
    </Suspense>
  );
}

export default App;
