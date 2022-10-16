import { IJob, IProperty } from './job';

export interface IPhone {
    id: number,
    phone: string,
    phoneType: string
}

export interface ICustomer {
    id: number,
    attributes: {
        name: string,
        createdAt: string,
        updatedAt: string,
        email: string,
        destination: IProperty | null,
        source: string,
        phones?: IPhone[]
        jobs?: { data: IJob[] }
    }
}