import { api } from './index';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto';
import { getUserInfoFromToken } from '../utils/auth';

const users = api.url('/users');

export default {
  me() {
    return users
      .url(`/${getUserInfoFromToken()?._id}`)
      .get()
      .json();
  },
  create(input: ICreateUserDto) {
    return users.post(input).json();
  },
  getAll(name = '') {
    return users.query({ name }).get();
  },
  patch(_id: string, input: Partial<ICreateUserDto>) {
    return users.url(`/${_id}`).patch(input);
  },
  update(_id: string, input: Partial<ICreateUserDto>) {
    return users.url(`/${_id}`).put(input);
  },
  delete(_id: string) {
    return users.url(`/${_id}`).delete();
  },
};
