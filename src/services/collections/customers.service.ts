import CollectionController from 'services/collectionController';

const populate = ['phones','jobs', 'destination'];
const url = 'customers';

class CustomersService extends CollectionController {
}

const customersService = new CustomersService(url, populate);
export default customersService;