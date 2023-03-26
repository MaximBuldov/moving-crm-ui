import { makeAutoObservable } from 'mobx';
import { IJob } from 'models/job';
import { ITruck } from 'models/truck';
import { IUserAttributes } from 'models/user';

class crewSchedule {
  // trucks: ITruck[];
  // workers: IUserAttributes[];
  // jobs: IJob[];
  // crews: 
  
  constructor() {
    makeAutoObservable(this);
  }



}

export const crewScheduleStore = new crewSchedule();