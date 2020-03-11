import { ISignUpDto } from '../interfaces/dto/sign-up.dto';
import { ISignInDto } from '../interfaces/dto/sign-in.dto';
import { api } from './index';

const auth = api.url('/auth');

export default {
  signIn(payload: ISignInDto) {
    return auth.url('/signin').post(payload);
  },
  signUp(payload: ISignUpDto) {
    return auth.url('/signup').post(payload);
  },
};
