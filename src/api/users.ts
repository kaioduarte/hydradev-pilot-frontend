import { api } from './index';
import { ResponseChain } from 'wretch';

async function jsonResponse(
  response: ResponseChain & Promise<any>,
): Promise<any> {
  return response.json().catch(e => JSON.parse(e.message || {}));
}

function me() {
  return jsonResponse(api.url('/users/me').get());
}

export default {
  me,
};
