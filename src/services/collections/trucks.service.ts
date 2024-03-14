import { ITruck, IStrapiResponse } from 'models';
import { CollectionController } from 'services';

const populate = ['*'];
const url = 'trucks';

class TrucksService extends CollectionController<IStrapiResponse<ITruck>> {
}

export const trucksService = new TrucksService(url, populate);