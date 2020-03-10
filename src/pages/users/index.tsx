import React, { useState, useEffect, useCallback } from 'react';
import { useConfirm } from 'material-ui-confirm';
// MUI components
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

// MUI icons
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';

import { useStyles } from './styles';
import usersApi from '../../api/users';
import { IUser } from '../../interfaces/models/user.interface';
import DialogForm from '../../layouts/main/components/dialog-form';
import UserForm from './components/user-form';
import DialogActions from '../../layouts/main/components/dialog-actions';
import UserPasswordForm from './components/user-password-form';
import UsersTable from './components/users-table';

function UsersPage() {
  const classes = useStyles();
  const confirm = useConfirm();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchTerm(e: any) {
    setSearchTerm(e.target.value);
  }

  const fetchUsers = useCallback(async () => {
    const response = await usersApi.getAll(searchTerm);

    if (response.status !== 'success') {
      return;
    }

    setUsers(response.data.users);
  }, [setUsers, searchTerm]);

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
  }, [fetchUsers, searchTerm]);

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
            value={searchTerm}
            onChange={handleSearchTerm}
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
      <UsersTable
        users={users}
        handleDelete={handleDelete}
        openDialog={openDialog}
        openPasswordForm={openPasswordForm}
        updateRole={updateRole}
      />
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
