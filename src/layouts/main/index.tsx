import React, { useEffect, useState, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// MUI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';

// MUI icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { ReactComponent as Logo } from '../../assets/images/cards.svg';
import SideBar from './components/sidebar';
import usersApi from '../../api/users';
import { removeToken, getUserInfoFromToken } from '../../utils/auth';

import routes from './routes';
import { useStyles } from './styles';

function MainLayout() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState(getUserInfoFromToken());
  const [filteredRoutes, setFilteredRoutes] = useState(routes);

  function logout() {
    removeToken();
    history.replace('/login');
  }

  useEffect(() => {
    async function getUserInfo() {
      const response = await usersApi.me();

      if (response.status !== 'success') {
        return;
      }

      setUser(response.data.user);
    }

    getUserInfo();
  }, []);

  useEffect(() => {
    setFilteredRoutes(
      routes.filter(
        ({ onlyAdmin }) => !onlyAdmin || (onlyAdmin && user?.role === 'admin'),
      ),
    );
  }, [user]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          <Logo width={40} height={40} className={classes.logo} />
          <Hidden smDown>
            <Typography variant="h6" className={classes.title}>
              Magic The Gathering
            </Typography>
          </Hidden>
          <div>
            <Grid container item alignItems="center">
              <Typography variant="body2" className={classes.title}>
                Hi, {user?.name.split(' ')[0]}
              </Typography>
              <IconButton
                color="inherit"
                aria-label="log out from app"
                onClick={logout}
              >
                <ExitToAppIcon />
              </IconButton>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <SideBar routes={filteredRoutes} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Suspense fallback={<CircularProgress />}>
          <Switch>
            {filteredRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ))}
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default MainLayout;
