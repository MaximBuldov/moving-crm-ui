import { throwError } from 'utils/trowError';
import { $apiGet, $apiPost } from 'services/http';

export default class ApiController {
  url: string;
  populate: string[];

  constructor(url: string, populate: string[]) {
    this.url = url;
    this.populate = populate;
  }
  
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
      return res.data.data;
    } catch(error: Error | any) {
      throwError(error);
    }
  };
}

// export const fetchCustomers = createAsyncThunk(
//   'customers/fetchCustomers',
//   async (_,{ rejectWithValue }) => {
//     return await request(rejectWithValue, 'GET', 'customers', populate);
//   }
// );

// export const fetchCustomer = createAsyncThunk(
//   'customers/fetchCustomer',
//   async (data,{ rejectWithValue }) => {
//     return await request(rejectWithValue, 'GET_SINGLE', 'customers', populate, data);
//   }
// );

// export const updateCustomer = createAsyncThunk(
//   'customers/updateCustomer',
//   async (data,{ rejectWithValue }) => {
//     return await request(rejectWithValue, 'PUT', 'customers', populate, data);
//   }
// );