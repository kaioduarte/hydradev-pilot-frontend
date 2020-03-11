import React, { useContext, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useForm, Controller, FieldError } from 'react-hook-form';
import * as Yup from 'yup';

// MUI components
import CircularProgress from '@material-ui/core/CircularProgress';
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
import { FetchContext } from '../../contexts/fetch';

function RegisterPage() {
  const classes = useStyles();
  const history = useHistory();
  const { interceptRequest } = useContext(FetchContext);
  const { control, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(3, 'Name should have at least 3 characters')
        .max(255, 'Name should have at most 255 characters')
        .required(),
      username: Yup.string()
        .trim()
        .min(3, 'Username should have at least 3 characters')
        .max(64, 'Username should have at most 64 characters')
        .required(),
      password: Yup.string()
        .trim()
        .min(6, 'Password must be at least 6 characters')
        .max(32, 'password must be at most 32 characters')
        .required(),
    }),
  });
  const [isSubmiting, setIsSubmiting] = useState(false);

  async function submitForm(data: any, e: any) {
    e.preventDefault();
    setIsSubmiting(true);
    const response = await interceptRequest(authApi.signUp(data));
    setIsSubmiting(false);

    if (response) {
      saveToken(response.data.token);
      history.replace('/');
    }
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
                error={!!errors.name}
                helperText={(errors?.name as FieldError)?.message}
              />
            }
            name="name"
            control={control}
            defaultValue=""
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
                error={!!errors.username}
                helperText={(errors?.username as FieldError)?.message}
              />
            }
            name="username"
            control={control}
            defaultValue=""
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
                error={!!errors.password}
                helperText={(errors?.password as FieldError)?.message}
              />
            }
            name="password"
            control={control}
            defaultValue=""
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!Object.keys(errors).length || isSubmiting}
          >
            Register {isSubmiting && <CircularProgress size="1rem" />}
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
