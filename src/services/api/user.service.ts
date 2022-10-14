import { ILoginForm } from 'pages/Login';
import { throwError } from 'utils/trowError';

import { $apiGet, $auth } from '../http';

class UserService {

  async login(data: ILoginForm) {
    try {
      const res = await $auth('auth/local', { data });
      return res.data.jwt;
    } catch (error: Error | any) {
      throwError(error);
    }
  }

  async me() {
    try {
      const res = await $apiGet('users/me', {
        params: {
          populate: '*'
        }
      });
      return res.data;
    } catch (error: Error | any) {
      throwError(error);
    }
  }
}

const userService = new UserService();

export default userService;