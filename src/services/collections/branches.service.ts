import CollectionController from 'services/collectionController';

const populate = ['mailingAddress'];
const url = 'branches';

class BranchesService extends CollectionController {
}

const branchesService = new BranchesService(url, populate);
export default branchesService;