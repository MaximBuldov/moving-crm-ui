import { IJob, IStrapiResponse } from 'models';
import { CollectionController } from 'services';

const populate = ['customer.phones', 'manager', 'origin', 'destination'];
const url = 'jobs';

class JobsService extends CollectionController<IStrapiResponse<IJob>> {
}

export const jobsService = new JobsService(url, populate);