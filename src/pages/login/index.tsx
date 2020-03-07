import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// MUI components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import authApi from '../../api/auth';
import { saveToken } from '../../utils/auth';
import { useStyles } from './styles';
import { ReactComponent as Logo } from '../../assets/images/cards.svg';

function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const { control, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submitForm(data: any, e: any) {
    e.preventDefault();
    const response = await authApi.signIn(data);

    if (response.status !== 'success') {
      setErrorMessage(response.data.message);
      return;
    }

    saveToken(response.data.token);
    history.replace('/');
  }

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Box>
          <Logo width={80} height={80} />
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(submitForm)}
        >
          <Controller
            as={
              <TextField
                autoFocus
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete="username"
              />
            }
            name="username"
            control={control}
          />
          <Controller
            as={
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            }
            name="password"
            control={control}
          />
          <Typography component="small" color="error">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginPage;
