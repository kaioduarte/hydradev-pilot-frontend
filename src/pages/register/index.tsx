import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

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

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const { control, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submitForm(data: any, e: any) {
    e.preventDefault();
    const response = await authApi.signUp(data);

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
          Register
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
                label="Name"
                autoComplete="name"
              />
            }
            name="name"
            control={control}
          />
          <Controller
            as={
              <TextField
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
          <Typography align="center" component="small" color="error">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default RegisterPage;
