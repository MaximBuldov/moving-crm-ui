import CollectionController from 'services/collectionController';

const populate = ['*'];
const url = 'users';

class UsersService extends CollectionController {
}

export const usersService = new UsersService(url, populate);