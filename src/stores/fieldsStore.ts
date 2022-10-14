import { JobsStatus, JobsStatusColors } from 'models/fields';

class Fields {
  data = {
    branches: ['San Diego', 'Las Vegas', 'Los Angeles'].map(this.transform),
    serviceType: ['Moving', 'Packing', 'Moving and Packing', 'Unpacking', 'Load Only', 'Upload Only', 'Load truck/POD/trailers', 'Labor Only'].map(this.transform),
    source: ['Google', 'Yelp', 'Facebook', 'Instagram', 'Thumbtack'].map(this.transform)
  };
  moveSize = ['Room or Less', 'Studio', 'One Bedroom Apartment', 'One Bedroom House', 'Two Bedroom Apartment', 'Two Bedroom House', 'Three Bedroom Apartment', 'Three Bedroom House', 'Four Bedroom House', 'Five Bedroom House', 'Small Office', 'Medium Office', 'Large Office', 'Storage 10 x 15', 'Storage 10 x 20', 'Storage 10 x 10', 'Storage 10 x 25', 'Storage 10 x 30'].map(this.transform);
  phoneType = ['Mobile', 'Home', 'Office', 'Other'].map(this.transform);
  jobStatus = [
    { name: JobsStatus.LEAD_IN_PROGRESS, color: JobsStatusColors.ORANGE },
    { name: JobsStatus.OPPORTUNITY, color: JobsStatusColors.GREEN },
    { name: JobsStatus.NEW_LEAD, color: JobsStatusColors.RED },
    { name: JobsStatus.BOOKED, color: JobsStatusColors.GREEN },
    { name: JobsStatus.SCEDULED, color: JobsStatusColors.GREEN },
    { name: JobsStatus.CONFIRMED, color: JobsStatusColors.GREEN },
    { name: JobsStatus.IN_PROGRESS, color: JobsStatusColors.GREEN },
    { name: JobsStatus.CLOSED, color: JobsStatusColors.BLACK },
    { name: JobsStatus.CANCELLED, color: JobsStatusColors.GRAY },
    { name: JobsStatus.LOST, color: JobsStatusColors.BLACK },
    { name: JobsStatus.BAD_LEAD, color: JobsStatusColors.BLACK }
  ];
  propertyType = ['Apartment', 'Assisted living', 'Commercial', 'High rise', 'House',	'Storage', 'Town house', 'Warehouse', 'Other'].map(this.transform);
  parkingType = ['Street', 'Parking lot', 'Garage', 'Other', 'Private driveway'].map(this.transform);
  stairsCount = ['No stairs', 'One flight', 'Two flights', 'Three flights', 'Four flights',	'Five flights', 'Six flights'].map(this.transform);
  walkDistance = ['Less than 100 feet', 'From 100 to 199 feet', 'From 200 to 299 feet', 'From 300 to 399 feet',	'From 400 to 499 feet',	'From 500 to 599 feet', 'From 600 to 699 feet', 'From 700 to 799 feet', 'From 800 to 899 feet',	'From 900 to 999 feet', 'More than 1000 feet'].map(this.transform);
  elevator = ['Yes', 'No'].map(this.transform);

  salesPerson = [
    {
      label: 'Maxim',
      value: 1
    }, {
      label: 'Jane',
      value: 2
    }
  ];

  transform(el: string) {
    return {
      label: el,
      value: el
    };
  }
}

const fieldsStore = new Fields();

export default fieldsStore;