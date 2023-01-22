import { ICustomer } from './customer';
import { JobsStatus } from './fields';
import { IUser } from './user';

export interface IProperty {
    id: number,
    propertyType: string,
    address: string,
    propertyName: string | null,
    unitNumber: string | null,
    parkingType: string | null,
    stairs: string | null,
    walkDistance: string | null,
    elevator: string | null
}

export interface IJob {
    id: number,
    attributes: {
        serviceType: string,
        createdAt: string,
        updatedAt: string,
        moveDate: string,
        moveSize: string,
        notes: string,
        jobStatus: JobsStatus,
        movePrice: number,
        customer?: {
            data: ICustomer
        },
        manager?: {
            data: IUser
        },
        origin: IProperty,
        destination: IProperty,
    }
}

export interface IJobsResponse {
    data: IJob[],
    meta: any
}