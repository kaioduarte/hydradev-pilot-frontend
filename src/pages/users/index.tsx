import React, { useState, useEffect } from 'react';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { useConfirm } from 'material-ui-confirm';
// MUI components
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';

// MUI icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyIcon from '@material-ui/icons/VpnKey';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { useStyles } from './styles';
import usersApi from '../../api/users';
import { IUser } from '../../interfaces/models/user.interface';
import DialogForm from '../../layouts/main/components/dialog-form';
import UserForm from './components/user-form';
import DialogActions from '../../layouts/main/components/dialog-actions';
import UserPasswordForm from './components/user-password-form';

function UsersPage() {
  const classes = useStyles();
  const confirm = useConfirm();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');

  async function fetchUsers() {
    const response = await usersApi.getAll();

    if (response.status !== 'success') {
      return;
    }

    setUsers(response.data.users);
  }

  function updateRole(user: IUser) {
    return () => {
      const role = user.role === 'basic' ? 'admin' : 'basic';
      usersApi.patch(user._id, { role }).then(() =>
        setUsers(prevState =>
          prevState.map(u => {
            if (u._id === user._id) {
              u.role = role;
            }

            return u;
          }),
        ),
      );
    };
  }

  function updatePassword(data: any) {
    if (userData && data.password === data.confirmPassword) {
      delete data.confirmPassword;
      usersApi.patch(userData._id, { password: data.password }).then(() => {
        setUserData(null);
        setIsPasswordFormOpen(false);
      });
    }
  }

  function handleDelete(user: IUser) {
    return () => {
      confirm({
        description: `This will permanently delete ${user.username}.`,
      })
        .then(() => usersApi.delete(user._id))
        .then(() =>
          setUsers(prevState => prevState.filter(u => u._id !== user._id)),
        )
        .catch();
    };
  }

  function openPasswordForm(user: IUser) {
    return () => {
      setUserData(user);
      setIsPasswordFormOpen(true);
    };
  }

  function openDialog(mode: 'create' | 'edit', user?: IUser) {
    return () => {
      if (user) {
        setUserData(user);
      }

      setIsDialogOpen(true);
      setMode(mode);
    };
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setIsPasswordFormOpen(false);
    if (userData) {
      setUserData(null);
    }
  }

  function handleSubmit(data: any, e?: any) {
    let promise;

    if (mode === 'create') {
      promise = usersApi.create(data);
    } else {
      promise = usersApi.update(userData?._id as string, data);
    }

    promise.then(response => {
      closeDialog();

      if (response.status === 'success') {
        fetchUsers();
      }
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <DialogForm
        showDialog={isDialogOpen}
        handleClose={closeDialog}
        title="User"
      >
        <UserForm data={userData} submitForm={handleSubmit} mode={mode}>
          <DialogActions handleClose={closeDialog} />
        </UserForm>
      </DialogForm>
      <DialogForm
        showDialog={isPasswordFormOpen}
        handleClose={closeDialog}
        title="Update user's password"
      >
        <UserPasswordForm submitForm={updatePassword}>
          <DialogActions handleClose={closeDialog} />
        </UserPasswordForm>
      </DialogForm>
      <Grid container justify="space-between">
        <FormControl fullWidth className={classes.searchBar}>
          <Input
            placeholder="Search user"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <Hidden smDown>
          <Button
            variant="text"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={openDialog('create')}
          >
            Add a new user
          </Button>
        </Hidden>
      </Grid>
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
      <Hidden mdUp>
        <Fab
          color="secondary"
          className={classes.fab}
          aria-label="add"
          onClick={openDialog('create')}
        >
          <AddIcon />
        </Fab>
      </Hidden>
    </>
  );
}

export default UsersPage;
