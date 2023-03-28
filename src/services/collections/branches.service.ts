import { CollectionController } from 'services';

const populate = ['mailingAddress'];
const url = 'branches';

class BranchesService extends CollectionController {
}

export const branchesService = new BranchesService(url, populate);