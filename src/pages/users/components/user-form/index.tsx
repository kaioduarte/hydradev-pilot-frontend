import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { IUser } from '../../../../interfaces/models/user.interface';

type Props = {
  children: any;
  data: IUser | null;
  submitForm: (data: any, e?: any) => void;
  mode: 'create' | 'edit';
};

const defaultValues = {
  name: '',
  username: '',
  password: '',
  role: 'basic',
};

function UserForm({ children, data, submitForm, mode }: Props) {
  const { control, handleSubmit } = useForm({
    defaultValues: data || defaultValues,
  });

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                label="Name"
                margin="dense"
                required
              />
            }
            control={control}
            name="name"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField fullWidth label="Username" margin="dense" required />
            }
            control={control}
            name="username"
          />
        </Grid>
        {mode === 'create' && (
          <Grid item xs={12}>
            <Controller
              as={
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="dense"
                  required
                />
              }
              control={control}
              name="password"
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Controller
            as={
              <FormControl fullWidth required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  margin="dense"
                  defaultValue={data?.role || 'basic'}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            }
            name="role"
            control={control}
          />
        </Grid>
      </Grid>
      {children}
    </form>
  );
}

export default UserForm;
