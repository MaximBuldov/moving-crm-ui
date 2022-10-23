import SingleController from 'services/singleController';

const url = 'setting';

class FieldsService extends SingleController {
}

const fieldsService = new FieldsService(url);

export default fieldsService;