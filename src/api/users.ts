import { api, jsonResponse, rawResponse } from './index';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto';
import { getUserInfoFromToken } from '../utils/auth';

export default {
  me() {
    return jsonResponse(api.url(`/users/${getUserInfoFromToken()?._id}`).get());
  },
  create(input: ICreateUserDto) {
    return jsonResponse(api.url('/users').post(input));
  },
  getAll() {
    return jsonResponse(api.url('/users').get());
  },
  patch(_id: string, input: Partial<ICreateUserDto>) {
    return jsonResponse(api.url(`/users/${_id}`).patch(input));
  },
  update(_id: string, input: Partial<ICreateUserDto>) {
    return jsonResponse(api.url(`/users/${_id}`).put(input));
  },
  delete(_id: string) {
    return rawResponse(api.url(`/users/${_id}`).delete());
  },
};
