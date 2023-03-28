export interface IStrapiMeta {
  pagination: {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
  }
}

export enum QueryType {
  TRUCKS = 'trucks',
  WORKERS = 'workers',
  CUSTOMERS = 'customers',
  JOBS = 'jobs',
  BRANCHES = 'branches',
  COMPANY = 'company',
  USER = 'user',
  FIELDS = 'fields'
}

export interface IStrapiParams {
  sort?: any,
  filters?: any,
  populate?: any,
  fields?: any,
  pagination?: IStrapiMeta,
  publicationState?: any,
  locale?: any
}