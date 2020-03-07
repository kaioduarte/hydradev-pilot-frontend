import jwtDecode from 'jwt-decode';
import { TOKEN_KEY } from '../constants';
import { IUser } from '../interfaces/models/user.interface';

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const getUserInfoFromToken = (): IUser | undefined => {
  const token = getToken();

  if (token) {
    return jwtDecode(token);
  }
};
