export interface IMailingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IBranch {
  id: number;
  attributes: {
    label: string;
    isPrimary: boolean;
    salesTaxRate: number;
    phone: string;
    smsPhone: string;
    dispatchLocation: string;
    mailingAddress: IMailingAddress;
  };
}