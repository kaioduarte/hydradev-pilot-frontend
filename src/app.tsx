import React, { Suspense, lazy, useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { LOGIN, COLLECTIONS, REGISTER } from './routes';
import { isLoggedIn } from './utils/auth';
import ProtectedRoute from './components/protected-route';
import { SnackbarContext } from './contexts/snackbar';

const MainLayout = lazy(() => import('./layouts/main'));
const LoginPage = lazy(() => import('./pages/login'));
const RegisterPage = lazy(() => import('./pages/register'));

function App() {
  const location = useLocation();
  const { notification } = useContext(SnackbarContext);

  if (
    isLoggedIn() &&
    (location.pathname === LOGIN || location.pathname === REGISTER)
  ) {
    return <Redirect to={COLLECTIONS} />;
  }

  return (
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute component={MainLayout} />
      </Switch>
      {notification}
    </Suspense>
  );
}

export default App;
