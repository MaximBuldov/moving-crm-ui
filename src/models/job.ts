import {ICompany} from "./company";
import {ICustomer} from "./customer";
import {IManager} from "./user";

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
        jobNumber: number,
        serviceType: string,
        createdAt: string,
        updatedAt: string,
        moveDate: string,
        moveSize: string,
        notes: string,
        jobStatus: string,
        movePrice: number,
        company?: {
            data: ICompany
        },
        customer?: {
            data: ICustomer
        },
        manager?: {
            data: IManager
        },
        origin: IProperty,
        destination: IProperty,
    }
}

export interface IJobsResponse {
    data: IJob[],
    meta: any
}