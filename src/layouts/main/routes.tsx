import { lazy } from 'react';

// MUI icons
import BookmarkIcon from '@material-ui/icons/Bookmark';
import GroupIcon from '@material-ui/icons/Group';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

export default [
  {
    path: '/cards',
    name: 'Cards',
    icon: ViewModuleIcon,
    component: lazy(() => import('../../pages/cards')),
    onlyAdmin: false,
  },
  {
    path: '/collections',
    name: 'Collections',
    icon: BookmarkIcon,
    component: lazy(() => import('../../pages/collections')),
    onlyAdmin: false,
  },
  {
    path: '/users',
    name: 'Users',
    icon: GroupIcon,
    component: lazy(() => import('../../pages/users')),
    onlyAdmin: true,
  },
];
