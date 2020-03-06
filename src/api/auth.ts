import { ISignUpDto } from '../interfaces/dto/sign-up.dto';
import { ISignInDto } from '../interfaces/dto/sign-in.dto';
import { api, jsonResponse } from './index';

export default {
  signIn(payload: ISignInDto) {
    return jsonResponse(api.url('/auth/signin').post(payload));
  },
  signUp(payload: ISignUpDto) {
    return jsonResponse(api.url('/auth/signup').post(payload));
  },
};
