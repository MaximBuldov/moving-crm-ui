import { CollectionController } from 'services';

const populate = ['*'];
const url = 'trucks';

class TrucksService extends CollectionController {
}

export const trucksService = new TrucksService(url, populate);