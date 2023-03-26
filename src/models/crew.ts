import { ITruck } from './truck';
import { IUserAttributes } from './user';

export interface ICrew {
  trucks: ITruck[],
  workers: IUserAttributes[],
}