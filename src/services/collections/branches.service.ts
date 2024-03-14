import { IBranch, IStrapiResponse } from 'models';
import { CollectionController } from 'services';

const populate = ['mailingAddress'];
const url = 'branches';

class BranchesService extends CollectionController<IStrapiResponse<IBranch>> {
}

export const branchesService = new BranchesService(url, populate);