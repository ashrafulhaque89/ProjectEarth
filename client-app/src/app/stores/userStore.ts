import { observable, computed, action, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { history } from '../..';
import { SyntheticEvent } from 'react';

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable activityRegistry = new Map();
  @observable submitting = false;
  @observable target = '';

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      runInAction(() => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities');
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push('/activities')
    } catch (error) {
      throw error;
    }
  }

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action getAllUser = async () => {
    try {
      const user = await agent.User.alluser();
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action deleteUser = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.User.deleteuser(id);
      runInAction('deleting user', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete user error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };



  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push('/');
  };
}
