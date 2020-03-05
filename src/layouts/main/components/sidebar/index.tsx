import React, { ReactNode } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NavLink from '../../../../components/nav-link';
import { useStyles } from './styles';

type Props = {
  routes: {
    path: string;
    name: string;
    icon: any;
    component: ReactNode;
    onlyAdmin: boolean;
    exact?: boolean;
  }[];
};

function SideBar({ routes }: Props) {
  const classes = useStyles();

  return (
    <List>
      {routes.map(route => (
        <ListItem
          key={route.path}
          activeClassName={classes.itemActiveItem}
          button
          className={classes.listItem}
          component={NavLink}
          to={route.path}
        >
          <ListItemIcon className={classes.listItemIcon}>
            <route.icon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary={route.name}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default SideBar;
