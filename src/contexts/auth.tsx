import React, {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { TOKEN_KEY } from '../constants';
import jwtDecode from 'jwt-decode';

type ContextProps = {
  setSuccessfulData: (response: any) => void;
  logout: (e: any) => void;
  userInfo: {
    isUserLoggedIn: boolean;
    user: any;
  };
  setUserInfo: Function;
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext({} as ContextProps);

export function AuthProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState({
    isUserLoggedIn: false,
    user: null,
  });

  function setSuccessfulData(response: any) {
    localStorage.setItem(TOKEN_KEY, response.data.token);
    setUserInfo({
      isUserLoggedIn: true,
      user: response.data.user,
    });
  }

  const logout = useCallback((e: any) => {
    localStorage.removeItem(TOKEN_KEY);
    setUserInfo({
      isUserLoggedIn: false,
      user: null,
    });
  }, []);

  useEffect(() => {
    async function restoreUserData() {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        return;
      }

      setUserInfo({ user: jwtDecode(token), isUserLoggedIn: true });
    }

    restoreUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setSuccessfulData,
        logout,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
