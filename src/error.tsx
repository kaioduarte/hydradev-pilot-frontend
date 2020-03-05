import React, { PureComponent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
  hasError: boolean;
};

export class ErrorBoundary extends PureComponent<Props, State> {
  state = {
    error: null,
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    console.log('error getDerivedStateFromError:', error.message);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log('error:', error);
    console.log('info:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong :(</h1>
          <p>{this.state.error}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
