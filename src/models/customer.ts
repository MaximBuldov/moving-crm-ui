

interface IPhone {
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
        address: string | null,
        source: string,
        phones?: IPhone[]
    }
}