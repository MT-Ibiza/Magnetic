import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth-slice';
import { CartSlice, createCartSlice } from './slices/cart-slice';
import { ItemSlice, createItemSlice } from './slices/item-slice';

export type StoreState = AuthSlice & CartSlice & ItemSlice;
export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
      ...createItemSlice(...a),
    };
  })
);
