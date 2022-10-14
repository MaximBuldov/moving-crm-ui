import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IUser } from 'models/user';

class User {
  data: IUser | null = null;
  token: string | null = null;
  
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: 'User', properties: ['data'], storage: window.localStorage });
  }

  setUser(data: IUser) {
    this.data = data;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  logout() {
    localStorage.clear();
    this.data = null;
    this.token = null;
  }

  get initials() {
    if (this.data) {
      return `${this.data.firstName.at(0)}${this.data.lastName.at(0)}`;
    }
    return '--';
  }

  get fullName() {
    if (this.data) {
      return `${this.data.firstName} ${this.data.lastName}`;
    }
    return null; 
  }

}

const userStore = new User();

export default userStore;
