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

function RegisterPage() {
  const { setSuccessfulData } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      const [error, response] = await authApi.signUp(formData);

      if (error) {
        setErrorMessage(error.data.message);
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
          Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleChangeField}
            value={formData.name}
          />
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
