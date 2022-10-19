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
    if (this.data?.fullName) {
      const parts = this.data.fullName.split(' ');
      return `${parts[0].at(0)}${parts[1].at(0)}`;
    }
    return '--';
  }
}

const userStore = new User();

export default userStore;
