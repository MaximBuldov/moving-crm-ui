import { CollectionController } from 'services';

const populate = ['phones','jobs', 'destination'];
const url = 'customers';

class CustomersService extends CollectionController {
}

export const customersService = new CustomersService(url, populate);