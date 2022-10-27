import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IBranch } from 'models/branch';
import { IField, JobsStatus, JobsStatusColors } from 'models/fields';
import { IManager } from 'models/user';

export interface IFieldsData {
  source: IField[];
  moveSize: IField[];
  serviceType: IField[];
  tags: IField[];
}

export const fieldNames = { label: 'label', value: 'label' };

class Fields {
  data: null | IFieldsData = null;
  branches: IBranch[] = [];
  managers: IManager[] = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: 'fields', properties: ['data', 'branches', 'managers'], storage: window.localStorage });
  }

  phoneType = ['Mobile', 'Home', 'Office', 'Other'].map(this.transform);
  jobStatus = [JobsStatus.LEAD_IN_PROGRESS, JobsStatus.OPPORTUNITY, JobsStatus.NEW_LEAD, JobsStatus.BOOKED, JobsStatus.SCEDULED, JobsStatus.CONFIRMED, JobsStatus.IN_PROGRESS, JobsStatus.CLOSED, JobsStatus.CANCELLED, JobsStatus.LOST, JobsStatus.BAD_LEAD].map(this.transform);
  propertyType = ['Apartment', 'Assisted living', 'Commercial', 'High rise', 'House', 'Storage', 'Town house', 'Warehouse', 'Other'].map(this.transform);
  parkingType = ['Street', 'Parking lot', 'Garage', 'Other', 'Private driveway'].map(this.transform);
  stairsCount = ['No stairs', 'One flight', 'Two flights', 'Three flights', 'Four flights', 'Five flights', 'Six flights'].map(this.transform);
  walkDistance = ['Less than 100 feet', 'From 100 to 199 feet', 'From 200 to 299 feet', 'From 300 to 399 feet', 'From 400 to 499 feet', 'From 500 to 599 feet', 'From 600 to 699 feet', 'From 700 to 799 feet', 'From 800 to 899 feet', 'From 900 to 999 feet', 'More than 1000 feet'].map(this.transform);
  elevator = ['Yes', 'No'].map(this.transform);

  setData(data: any) {
    this.data = data;
  }

  setBranches(data: any) {
    data = data.map((branch: any) => ({
      id: branch.id,
      value: branch.id,
      label: branch.label
    }));
    this.branches = data;
  }

  addBranch(data: any) {
    data = {
      label: data.attributes.label,
      id: data.id,
      value: data.id,
    };
    this.branches.push(data);
  }

  setManagers(data: any) {
    data = data.map((manager: any) => ({
      ...manager,
      value: manager.id,
      label: manager.fullName
    }));
    this.managers = data;
  }

  transform(el: string) {
    return {
      label: el,
      value: el
    };
  }

  getStatusColor(text: JobsStatus) {
    let color = '';
    switch (text) {
    case JobsStatus.LEAD_IN_PROGRESS:
      color = JobsStatusColors.ORANGE;
      break;
    case JobsStatus.OPPORTUNITY:
    case JobsStatus.BOOKED:
    case JobsStatus.CONFIRMED:
    case JobsStatus.SCEDULED:
    case JobsStatus.IN_PROGRESS:
      color = JobsStatusColors.GREEN;
      break;
    case JobsStatus.NEW_LEAD:
      color = JobsStatusColors.RED;
      break;
    case JobsStatus.CLOSED:
    case JobsStatus.LOST:
    case JobsStatus.BAD_LEAD:
      color = JobsStatusColors.BLACK;
      break;
    case JobsStatus.CANCELLED:
      color = JobsStatusColors.GRAY;
    }

    return color;
  }

}

const fieldsStore = new Fields();

export default fieldsStore;