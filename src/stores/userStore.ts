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

}

const userStore = new User();

export default userStore;
