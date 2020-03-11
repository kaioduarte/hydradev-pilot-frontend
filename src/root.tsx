import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConfirmProvider } from 'material-ui-confirm';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import App from './app';
import history from './utils/history';
import SnackbarProvider from './contexts/snackbar';

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConfirmProvider>
          <CssBaseline />
          <GlobalStyle />

          <Router history={history}>
            <Route component={App} />
          </Router>
        </ConfirmProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}

export default hot(Root);
