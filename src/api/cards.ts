import { api } from './index';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto';
import { getUserInfoFromToken } from '../utils/auth';

const userPrefix = `/users/${getUserInfoFromToken()?._id}/cards`;

export default {
  create(input: ICreateUserDto) {
    return api.url(userPrefix).post(input);
  },
  getAll(name = '') {
    return api
      .url('/cards')
      .query({ name })
      .get();
  },
  delete(_id: string) {
    return api.url(`${userPrefix}/${_id}`).delete();
  },
};
