import dayjs from 'dayjs';
import { makeAutoObservable } from 'mobx';
import { ICrew, ICrewsScedule, IJob, IResources, ITruck, IUserAttributes } from 'models';

export interface UpdateCrewsProps {
  from: string | number,
  to: string | number,
  resource: any,
  resName: IResources
}

class crewSchedule {
  trucks: ITruck[] = [];
  workers: IUserAttributes[] = [];
  jobs: IJob[] = [];
  dayInfo: {
    id?: number | string;
    date: string;
  } = { date: dayjs().format('YYYY-MM-DD') };
  crews: ICrew[] = [
    { id: 1, name: 'Crew 1' },
    { id: 2, name: 'Crew 2' },
    { id: 3, name: 'Crew 3' },
    { id: 4, name: 'Crew 4' }
  ];
  
  constructor() {
    makeAutoObservable(this);
  }
  
  setTrucks(data: ITruck[]) {
    this.trucks = data;
  }

  setWorkers(data: IUserAttributes[]) {
    this.workers = data;
  }

  setJobs(data: IJob[]) {
    this.jobs = data;
  }

  updateOneCrew(data: ICrew) {
    this.crews = this.crews.map(crew => {
      return crew.id === data.id ? { ...crew, ...data } : crew;
    });
  }

  moveResource({ from, to, resource, resName }: UpdateCrewsProps) {
    if(from !== to) {
      if(typeof from === 'string' && typeof to === 'number') {
        const crewIndex = this.crews.findIndex(crew => crew.id === to);
        if (!this.crews[crewIndex][resName]) {
          this.crews[crewIndex][resName] = { data: [resource] };
        } else {
          this.crews[crewIndex][resName]!.data.push(resource);
        }
      }
      if(typeof from === 'number' && typeof to === 'number') {
        const crewIndexFrom = this.crews.findIndex(crew => crew.id === from);
        const crewIndexTo = this.crews.findIndex(crew => crew.id === to);
        
        this.crews[crewIndexFrom][resName]!.data = (this.crews[crewIndexFrom][resName]!.data as any[]).filter(res => res.id !== resource.id);

        if (!this.crews[crewIndexTo][resName]) {
          this.crews[crewIndexTo][resName] = { data: [resource] };
        } else {
          this.crews[crewIndexTo][resName]!.data.push(resource);
        }
      }
      if(typeof from === 'number' && typeof to === 'string') {
        const crewIndex = this.crews.findIndex(crew => crew.id === from);
        this.crews[crewIndex][resName]!.data = (this.crews[crewIndex][resName]!.data as any[]).filter(res => res.id !== resource.id);
      }
    }
  }

  setDayInfo(data: ICrewsScedule) {
    this.dayInfo = {
      id: data.id,
      date: data.attributes.date
    };
    this.crews = data.attributes.crew;
  }

  get crewsWithIds() {
    return this.crews.map((crew) => {
      return {
        ...crew,
        trucks: { connect: crew.trucks?.data.map(el => el.id) },
        jobs: { connect: crew.jobs?.data.map(el => el.id) },
        workers: { connect: crew.workers?.data.map(el => el.id) }
      };
    });
  }
}

export const crewScheduleStore = new crewSchedule();