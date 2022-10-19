import { throwError } from 'utils/trowError';
import { $apiGet, $apiPost, $apiPut } from 'services/http';

export default class ApiController {
  url: string;
  populate: string[];

  constructor(url: string, populate: string[]) {
    this.url = url;
    this.populate = populate;
  }

  private urlId = (id: string | number) => `${this.url}/${id}`;
  
  createOne = async (data: any) => {
    try {
      const res = await $apiPost(this.url, { data: { data } });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  fetchMany = async (params?: any) => {
    try {
      const res = await $apiGet(this.url, { 
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
      const res = await $apiGet(this.urlId(id), { params: { populate: this.populate } });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };

  updateOne = async ({ id, data }: {id: string | number, data: any}) => {
    try {
      const res = await $apiPut(this.urlId(id), { data: { data } });
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };
}
