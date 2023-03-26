import { throwError } from 'utils/trowError';
import { $api } from 'services/http';
import { AxiosRequestConfig } from 'axios';

export default class CollectionController {
  private url: string;
  private populate: string[];

  constructor(url: string, populate: string[]) {
    this.url = url;
    this.populate = populate;
  }

  private urlId = (id: string | number) => `${this.url}/${id}`;
  
  createOne = async (data: any) => {
    try {
      const res = await $api.post(this.url, { data });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  fetchMany = async (params?: any) => {
    try {
      const res = await $api.get(this.url, { 
        params: {
          populate: this.populate,
          ...params
        }
      }
      );
      return res.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  fetchOne = async (id: string) => {
    try {
      const res = await $api.get(this.urlId(id), { params: { populate: this.populate } });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  updateOne = async ({ id, data }: {id: string | number, data: any}) => {
    try {
      const res = await $api.put(this.urlId(id), { data });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  deleteOne = async (id: number) => {
    try {
      const res = await $api.delete(this.urlId(id));
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };
}
