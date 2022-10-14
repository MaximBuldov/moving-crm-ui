import { ICompany } from './company';

interface IUserAttributes {
    username: string,
    email: string,
    provider: string,
    confirmed: false,
    blocked: false,
    createdAt: string,
    updatedAt: string,
    accountType: string,
    firstName: string,
    lastName: string
}

export interface IUser extends IUserAttributes {
    id: number
    company?: ICompany
}

export interface IManager {
    id: number
    attributes: IUserAttributes
}

export type UserState = {
    data: IUser | null,
    isLoading: boolean
}
