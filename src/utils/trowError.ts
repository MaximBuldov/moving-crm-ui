import { AxiosError } from 'axios';

export function throwError(error: AxiosError | Error | any) {
  let err: string = 'Error';
  if (error?.response?.data?.error?.message) {
    err = error.response.data.error.message;
  }
  if (error?.message) {
    err = error.message;
  }
  throw new Error(err);
}