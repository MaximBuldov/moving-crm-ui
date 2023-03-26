import SingleController from 'services/singleController';

const url = 'setting';

class FieldsService extends SingleController {
}

export const fieldsService = new FieldsService(url);
