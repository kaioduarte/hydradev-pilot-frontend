import { api, jsonResponse, rawResponse } from './index';
import { ICreateUserDto } from '../interfaces/dto/create-user.dto';
import { getUserInfoFromToken } from '../utils/auth';

const userPrefix = `/users/${getUserInfoFromToken()?._id}/cards`;

export default {
  create(input: ICreateUserDto) {
    return jsonResponse(api.url(userPrefix).post(input));
  },
  getAll(name = '') {
    return jsonResponse(api.url(`/cards?name=${name}`).get());
  },
  delete(_id: string) {
    return rawResponse(api.url(`${userPrefix}/${_id}`).delete());
  },
};
