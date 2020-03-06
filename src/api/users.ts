import { api, jsonResponse } from './index';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto';

export default {
  me() {
    return jsonResponse(api.url('/users/me').get());
  },
  getAll() {
    return jsonResponse(api.url('/users').get());
  },
  patch(_id: string, input: Partial<ICreateUserDto>) {
    return jsonResponse(api.url(`/users/${_id}`).patch(input));
  },
  delete(_id: string) {
    return jsonResponse(api.url(`/users/${_id}`).delete());
  },
};
