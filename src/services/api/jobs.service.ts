import ApiController from 'services/apiController';

const populate = ['customer.phones', 'manager', 'origin', 'destination'];
const url = 'jobs';

class JobsService extends ApiController {
}

const jobsService = new JobsService(url, populate);
export default jobsService;