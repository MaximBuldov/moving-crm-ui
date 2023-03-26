import CollectionController from 'services/collectionController';

const populate = ['customer.phones', 'manager', 'origin', 'destination'];
const url = 'jobs';

class JobsService extends CollectionController {
}

export const jobsService = new JobsService(url, populate);