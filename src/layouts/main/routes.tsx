import { lazy } from 'react';

import { MdBookmark, MdGroup } from 'react-icons/md';

export default [
  {
    path: '/collections',
    name: 'Collections',
    icon: MdBookmark,
    component: lazy(() => import('../../pages/collections')),
    onlyAdmin: false,
    exact: true,
  },
  {
    path: '/users',
    name: 'Users',
    icon: MdGroup,
    component: lazy(() => import('../../pages/users')),
    onlyAdmin: true,
  },
];
