import { IPhone } from 'models';

export enum formatPhoneAction {
  FORMAT = 'format',
  UNFORMAT = 'unformat'
}

export function formattedPhone(value: string): string {
  const phone = value.replace(/\D/g, '')
    .replace(/^(\d)/, '($1')
    .replace(/^(\(\d{3})(\d)/, '$1) $2')
    .replace(/(\d{3})(\d{1,5})/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
  return phone; 
}

export function unformattedPhone(value: string) {
  return value.replace(/[^\d]/g, '');
}

export function formattedPhones(arr?: IPhone[], type?: formatPhoneAction) {
  if (arr) {
    const fn = type === formatPhoneAction.FORMAT ? formattedPhone : unformattedPhone;
    return arr.map((el: any) => ({
      ...el,
      phone: fn(el.phone)
    }));
  } else {
    return [{}];
  }
  
}