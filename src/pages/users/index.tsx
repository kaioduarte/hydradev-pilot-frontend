import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import usersApi from '../../api/users';
import { IUser } from '../../interfaces/models/user.interface';
import { parseISO, formatDistanceToNow } from 'date-fns';
import {
  MdDelete as DeleteIcon,
  MdEdit as EditIcon,
  MdStar as StarIcon,
  MdStarBorder as StarBorderIcon,
} from 'react-icons/md';
import { useConfirm } from 'material-ui-confirm';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UsersPage() {
  const classes = useStyles();
  const confirm = useConfirm();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await usersApi.getAll();

      if (response.status !== 'success') {
        return;
      }

      setUsers(response.data.users);
    }

    fetchUsers();
  }, []);

  function updateRole(user: IUser) {
    return async () => {
      const role = user.role === 'basic' ? 'admin' : 'basic';
      await usersApi.patch(user._id, { role });
    };
  }

  function handleDelete(user: IUser) {
    return () => {
      confirm({
        description: `This will permanently delete ${user.username}.`,
      })
        .then(() => usersApi.delete(user._id))
        .catch();
    };
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
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
                    title={`${
                      user.role === 'basic' ? 'Promote' : 'Demote'
                    } user`}
                  >
                    <IconButton
                      aria-label="promote or demote user"
                      onClick={updateRole(user)}
                    >
                      {user.role === 'basic' ? (
                        <StarIcon />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit user">
                    <IconButton aria-label="edit user">
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
    </>
  );
}

export default UsersPage;
