import CollectionController from 'services/collectionController';

const populate = ['*'];
const url = 'users';

class UsersService extends CollectionController {
}

const usersService = new UsersService(url, populate);
export default usersService;