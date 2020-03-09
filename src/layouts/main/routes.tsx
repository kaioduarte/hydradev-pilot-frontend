import { lazy } from 'react';

// MUI icons
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GroupIcon from '@material-ui/icons/Group';

export default [
  {
    path: '/collections',
    name: 'Collections',
    icon: BookmarkIcon,
    component: lazy(() => import('../../pages/collections')),
    onlyAdmin: false,
    exact: true,
  },
  {
    path: '/users',
    name: 'Users',
    icon: GroupIcon,
    component: lazy(() => import('../../pages/users')),
    onlyAdmin: true,
  },
];
