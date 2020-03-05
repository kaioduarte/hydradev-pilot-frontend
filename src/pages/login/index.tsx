import React, { useContext, useCallback, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { ReactComponent as Logo } from '../../assets/images/cards.svg';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  TextField,
  Container,
  Typography,
  Button,
  makeStyles,
  Link,
  Box,
} from '@material-ui/core';
import authApi from '../../api/auth';

const useStyles = makeStyles(theme => ({
  main: {
    margin: 'auto',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginPage() {
  const { setSuccessfulData } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const response = await authApi.signIn(formData);

      if (response.status !== 'success') {
        console.log(response);
        setErrorMessage(response.data.message);
        return;
      }

      setSuccessfulData(response);
    },
    [formData, setSuccessfulData],
  );

  function handleChangeField(e: any) {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  const classes = useStyles();

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Box>
          <Logo width={80} height={80} />
        </Box>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChangeField}
            value={formData.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChangeField}
            value={formData.password}
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
