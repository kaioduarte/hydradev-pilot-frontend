import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// TODO: try to install again @material-ui/icons
import { MdAccountCircle as AccountCircle } from 'react-icons/md';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Drawer from '@material-ui/core/Drawer';

import { Grid, Hidden } from '@material-ui/core';
import { useStyles } from './styles';
import { AuthContext } from '../../contexts/auth';
import routes from './routes';
import { Route } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/images/cards.svg';
import SideBar from './components/sidebar';

function MainLayout() {
  const classes = useStyles();
  const {
    userInfo: { user },
    logout,
  } = useContext(AuthContext);
  const [filteredRoutes, setFilteredRoutes] = useState(routes);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    setFilteredRoutes(
      routes.filter(
        ({ onlyAdmin }) => !onlyAdmin || (onlyAdmin && user.role === 'admin'),
      ),
    );
  }, [user]);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{ root: classes.toolbarRoot }}>
          <Hidden smDown>
            <Typography variant="h6" className={classes.title}>
              Magic The Gathering
            </Typography>
          </Hidden>
          <Hidden mdUp>
            <Logo width={40} height={40} />
          </Hidden>
          <div>
            <Grid container item alignItems="center">
              <Typography variant="body2" className={classes.title}>
                Hi, {user.name.split(' ')[0]}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Grid>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
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
        {filteredRoutes.map(route => (
          <Route key={route.path} path={route.path} />
        ))}
      </main>
    </div>
  );
}

export default MainLayout;
