import { IJob } from './job';
import { ITruck } from './truck';
import { IUserAttributes } from './user';

export enum IResources {
  TRUCKS = 'trucks',
  WORKERS = 'workers',
  JOBS = 'jobs'
}

export interface ICrew {
  trucks?: { data: ITruck[]; }
  workers?: { data: IUserAttributes[]; }
  jobs?: { data: IJob[]; }
  name?: string;
  id: number;
}

export interface ICrewsScedule {
  id: number;
  attributes: {
    date: string;
    crew: ICrew[];
  }
}