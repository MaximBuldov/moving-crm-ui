import CollectionController from 'services/collectionController';

const populate = ['customer.phones', 'manager', 'origin', 'destination'];
const url = 'jobs';

class JobsService extends CollectionController {
}

const jobsService = new JobsService(url, populate);
export default jobsService;