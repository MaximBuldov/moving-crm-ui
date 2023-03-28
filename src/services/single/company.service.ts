import { SingleController } from 'services';

const url = 'contact';

class CompanyService extends SingleController {
}

export const companyService = new CompanyService(url);