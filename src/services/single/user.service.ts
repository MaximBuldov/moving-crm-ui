import { ILoginForm } from 'pages';
import { $api, $auth } from 'services';
import { throwError } from 'utils';

class UserService {

  async login(data: ILoginForm) {
    try {
      const res = await $auth('auth/local', { data });
      return res.data;
    } catch (error: Error | any) {
      throwError(error);
    }
  }

  async me() {
    try {
      const res = await $api.get('users/me', {
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

export const userService = new UserService();
