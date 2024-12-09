import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { User } from '@magnetic/interfaces';

export type UsersSlice = {
  setCurrentProfileUser: (user: User) => void;
  currentProfileUser: User;
};

export const createUsersSlice: StateCreator<StoreState, [], [], UsersSlice> = (
  set,
  get
) => ({
  currentProfileUser: {} as User,
  setCurrentProfileUser: (currentProfileUser) => {
    set({ currentProfileUser });
  },
});
