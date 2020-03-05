import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { GlobalStyle } from './styles/global';
import { theme } from './styles/theme';
import { AuthProvider } from './contexts/auth';
import App from './app';

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <GlobalStyle />

          <BrowserRouter>
            <Route component={App} />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default hot(Root);
