import { Gender } from '@/app/constants/enum/gender';
import { post } from './index';

interface LoginInterface {
  userName: string;
  password: string;
}

export interface UserBody extends LoginInterface {
  nick: string;
  gender: keyof typeof Gender[keyof typeof Gender];
  birth: string;
}

const MEMBER = '/member';

const login = async (body: LoginInterface) => {
  return post(`${MEMBER}/login`, body);
};

const duplicateCheck = async (userName: LoginInterface['userName']) => {
  return post(`${MEMBER}/checkId?userName=${userName}`);
}

const signup = async (body: UserBody) => {
  return post(`${MEMBER}/signUp`, body);
}

export {
  login,
  duplicateCheck,
  signup
}