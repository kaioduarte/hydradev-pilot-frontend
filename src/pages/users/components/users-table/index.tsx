import React, { memo } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

// MUI icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyIcon from '@material-ui/icons/VpnKey';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { useStyles } from './styles';
import { IUser } from '../../../../interfaces/models/user.interface';

type Props = {
  users: IUser[];
  handleDelete: (user: IUser) => () => void;
  openDialog: (mode: 'create' | 'edit', user: IUser) => () => void;
  openPasswordForm: (user: IUser) => () => void;
  updateRole: (user: IUser) => () => void;
};

function UsersTable(props: Props) {
  const classes = useStyles();
  const {
    users,
    handleDelete,
    openDialog,
    openPasswordForm,
    updateRole,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="user table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Last modified</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: IUser) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="left">{user.username}</TableCell>
              <TableCell align="left">{user.role}</TableCell>
              <TableCell align="left">
                {formatDistanceToNow(parseISO(user.updatedAt), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </TableCell>
              <TableCell>
                <Tooltip
                  title={`${user.role === 'basic' ? 'Promote' : 'Demote'} user`}
                >
                  <IconButton
                    aria-label="promote or demote user"
                    onClick={updateRole(user)}
                  >
                    {user.role === 'basic' ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit password">
                  <IconButton
                    aria-label="edit user password"
                    onClick={openPasswordForm(user)}
                  >
                    <KeyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit user">
                  <IconButton
                    aria-label="edit user"
                    onClick={openDialog('edit', user)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete user">
                  <IconButton
                    aria-label="delete user"
                    onClick={handleDelete(user)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(UsersTable);
