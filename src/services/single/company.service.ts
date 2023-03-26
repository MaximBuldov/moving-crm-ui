import SingleController from 'services/singleController';

const url = 'contact';

class CompanyService extends SingleController {
}

export const companyService = new CompanyService(url);