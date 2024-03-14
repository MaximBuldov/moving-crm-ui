import { IUserAttributes } from 'models';
import { CollectionController } from 'services';

const populate = ['*'];
const url = 'users';

class UsersService extends CollectionController<IUserAttributes[]> {
}

export const usersService = new UsersService(url, populate);