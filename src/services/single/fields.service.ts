import { SingleController } from 'services';

const url = 'setting';

class FieldsService extends SingleController {
}

export const fieldsService = new FieldsService(url);
