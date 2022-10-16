import ApiController from 'services/apiController';

const populate = ['phones','jobs', 'destination'];
const url = 'customers';

class CustomersService extends ApiController {
}

const customersService = new CustomersService(url, populate);
export default customersService;