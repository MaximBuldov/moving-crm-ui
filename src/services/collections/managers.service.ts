import CollectionController from 'services/collectionController';

const populate = ['*'];
const url = 'users';

class ManagersService extends CollectionController {
}

const managersService = new ManagersService(url, populate);
export default managersService;