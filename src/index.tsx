import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary } from './error';
import Root from './root';

ReactDOM.render(
  <ErrorBoundary>
    <Root />
  </ErrorBoundary>,
  document.getElementById('root'),
);
