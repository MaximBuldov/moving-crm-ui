import { ICustomer, IStrapiResponse } from 'models';
import { CollectionController } from 'services';

const populate = ['phones','jobs', 'destination'];
const url = 'customers';

class CustomersService extends CollectionController<IStrapiResponse<ICustomer>> {
}

export const customersService = new CustomersService(url, populate);