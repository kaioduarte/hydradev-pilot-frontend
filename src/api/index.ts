import wretch from 'wretch';
import { TOKEN_KEY } from '../constants';

const apiUrl = process.env.REACT_APP_API_URL as string;

export const api = wretch(apiUrl)
  .errorType('json')
  .middlewares([
    next => (url, opts) => {
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
      };

      return next(url, opts);
    },
  ]);
