import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

type Props = {
  children: any;
  submitForm: (data: any, e?: any) => void;
};

function UserPasswordForm({ children, submitForm }: Props) {
  const { control, handleSubmit } = useForm();

  return (
    <form noValidate onSubmit={handleSubmit(submitForm)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                autoFocus
                fullWidth
                label="Password"
                margin="dense"
                required
              />
            }
            control={control}
            name="password"
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            as={
              <TextField
                fullWidth
                label="Confirm password"
                margin="dense"
                required
              />
            }
            control={control}
            name="confirmPassword"
          />
        </Grid>
      </Grid>
      {children}
    </form>
  );
}

export default UserPasswordForm;
