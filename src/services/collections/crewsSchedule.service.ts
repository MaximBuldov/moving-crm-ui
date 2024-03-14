import { ICrewsScedule, IStrapiResponse } from 'models';
import { CollectionController } from 'services';

const populate = ['crew', 'crew.trucks', 'crew.workers', 'crew.jobs'];
const url = 'crew-schedules';

class CrewsSceduleService extends CollectionController<IStrapiResponse<ICrewsScedule>> {
}

export const crewsSceduleService = new CrewsSceduleService(url, populate);