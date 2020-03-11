import React, {
  createContext,
  useCallback,
  useContext,
  ReactNode,
} from 'react';
import { ResponseChain } from 'wretch';
import { SnackbarContext } from './snackbar';
import { TOKEN_KEY } from '../constants';
import history from '../utils/history';

type ContextProps = {
  interceptRequest: (
    request: ResponseChain & Promise<any>,
    responseType?: 'json' | 'blob' | 'formData',
  ) => Promise<any>;
};

type Props = {
  children: ReactNode;
};

export const FetchContext = createContext({} as ContextProps);

function FetchProvider({ children }: Props) {
  const { showNotification } = useContext(SnackbarContext);

  const interceptRequest = useCallback(
    async (
      request: ResponseChain & Promise<any>,
      responseType: 'json' | 'blob' | 'formData' = 'json',
    ) => {
      try {
        const handler = request
          .unauthorized(error => {
            localStorage.removeItem(TOKEN_KEY);
            history.push('/login');
            showNotification(error.json.data.message);
          })
          .forbidden(error => {
            history.push('/cards');
            window.location.reload();
            showNotification(error.json.data.message);
          });

        let responseTypeHandler: Promise<any>;

        switch (responseType) {
          case 'json': {
            responseTypeHandler = handler.json();
            break;
          }
          case 'blob': {
            responseTypeHandler = handler.blob();
            break;
          }
          case 'formData': {
            responseTypeHandler = handler.formData();
            break;
          }
        }

        return await responseTypeHandler;
      } catch (error) {
        if (error.json?.data?.message) {
          showNotification(error.json.data.message);
        }
      }
    },
    [showNotification],
  );

  return (
    <FetchContext.Provider value={{ interceptRequest }}>
      {children}
    </FetchContext.Provider>
  );
}

export default FetchProvider;
