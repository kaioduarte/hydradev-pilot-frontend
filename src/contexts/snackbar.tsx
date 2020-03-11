import React, { createContext, useCallback, useState, ReactNode } from 'react';

import MuiSnackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

type ContextProps = {
  notification: ReactNode | null;
  showNotification: (content: string) => void;
};

type Props = {
  children: ReactNode;
};

export const SnackbarContext = createContext({} as ContextProps);

const SNACK_TIMEOUT_MS = 5000;

function SnackbarProvider({ children }: Props) {
  const [notification, setState] = useState<ReactNode | null>(null);

  const closeToast = useCallback(() => setState(null), []);

  const showNotification = useCallback(
    content => {
      setState(
        <MuiSnackbar
          action={
            <IconButton aria-label="Close" color="inherit" onClick={closeToast}>
              <CloseIcon />
            </IconButton>
          }
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          message={content}
          onClose={closeToast}
          open
        />,
      );
      setTimeout(closeToast, SNACK_TIMEOUT_MS);
    },
    [closeToast],
  );

  return (
    <SnackbarContext.Provider
      value={{
        notification,
        showNotification,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export default SnackbarProvider;
