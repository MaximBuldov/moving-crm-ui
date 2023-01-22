export interface ITruck {
  id: number;
  attributes: {
    name: string,
    active: boolean,
    branch: string,
    length: number,
    capacity: number
  }
}