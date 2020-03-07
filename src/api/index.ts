import wretch, { ResponseChain } from 'wretch';
import { TOKEN_KEY } from '../constants';
import history from '../utils/history';

const apiUrl = process.env.REACT_APP_API_URL as string;

export async function jsonResponse(
  response: ResponseChain & Promise<any>,
): Promise<any> {
  return response.json().catch(e => JSON.parse(e.message || {}));
}

export async function rawResponse(
  response: ResponseChain & Promise<any>,
): Promise<any> {
  return response.res().catch(e => JSON.parse(e.message || {}));
}

export const api = wretch(apiUrl)
  .middlewares([
    next => (url, opts) => {
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      };

      return next(url, opts);
    },
  ])
  .catcher(401, error => {
    localStorage.removeItem(TOKEN_KEY);
    history.push('/login');
    console.log('catcher', error);
    throw error;
  });
