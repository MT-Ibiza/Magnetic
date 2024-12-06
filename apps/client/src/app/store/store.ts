import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth-slice';

export type StoreState = AuthSlice;
export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createAuthSlice(...a),

    };
  })
);
