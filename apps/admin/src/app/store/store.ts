import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth-slice';
import { createUsersSlice, UsersSlice } from './slices/users-slice';

export type StoreState = AuthSlice &
UsersSlice;

export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createAuthSlice(...a),
      ...createUsersSlice(...a),
    };
  })
);
