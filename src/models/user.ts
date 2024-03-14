export enum IAccountTypes {
    OWNER = 'owner',
    MANAGER = 'manager',
    FOREMAN = 'foreman',
    HELPER = 'helper'
}

export interface IUserAttributes {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    accountType: IAccountTypes,
    fullName: string,
    phone: string
}

export interface IUser {
    id: number
    attributes: IUserAttributes
}

export type UserState = {
    data: IUser | null,
    isLoading: boolean
}
