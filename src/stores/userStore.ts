import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { IUser, IUserAttributes } from 'models/user';

class User {
  data: IUserAttributes | null = null;
  isAuth: boolean = false;
  
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: 'User', properties: ['data'], storage: window.localStorage });
  }

  setUser(data: IUserAttributes) {
    this.data = data;
  }

  setAuth(token: string) {
    localStorage.setItem('token', token);
    this.isAuth = true;
  }

  logout() {
    localStorage.clear();
    this.isAuth = false;
    this.data = null;
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
