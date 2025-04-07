import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './slices/auth-slice';
import { CartSlice, createCartSlice } from './slices/cart-slice';
import { ItemSlice, createItemSlice } from './slices/item-slice';
import {
  GuestCartSlice,
  createGuestCartSlice,
} from './slices/guest-cart-slice';

export type StoreState = AuthSlice & CartSlice & ItemSlice & GuestCartSlice;
export const useAppStore = create<StoreState>()(
  devtools((...a) => {
    return {
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
      ...createItemSlice(...a),
      ...createItemSlice(...a),
      ...createGuestCartSlice(...a),
    };
  })
);
