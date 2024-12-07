import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth-slice';
import { CartSlice, createCartSlice } from './slices/cart-slice';

export type StoreState = AuthSlice & CartSlice;
export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
    };
  })
);
