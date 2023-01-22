import CollectionController from 'services/collectionController';

const populate = ['*'];
const url = 'trucks';

class TrucksService extends CollectionController {
}

const trucksService = new TrucksService(url, populate);
export default trucksService;