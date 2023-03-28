import { throwError } from 'utils';

import { $api } from './http';

export default class SingleController {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }
  
  fetch = async () => {
    try {
      const res = await $api.get(this.url, { params: { populate: '*' } });
      return res.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  update = async (data: any) => {
    try {
      const res = await $api.put(this.url, { data });
      return res.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  remove = async () => {
    try {
      const res = await $api.delete(this.url);
      return res.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };
}
