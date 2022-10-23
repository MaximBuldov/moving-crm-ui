import SingleController from 'services/singleController';

const url = 'contact';

class CompanyService extends SingleController {
}

const companyService = new CompanyService(url);

export default companyService;