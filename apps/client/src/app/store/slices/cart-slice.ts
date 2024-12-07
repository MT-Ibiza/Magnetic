import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CartItem, Item } from '@magnetic/interfaces';

const CART_STORAGE_KEY = 'cart_state';

const getInitialCart = () => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

// export type CartItem = {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// };

export type CartSlice = {
  cart: CartItem[];
  total: number;
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
};

export const createCartSlice: StateCreator<StoreState, [], [], CartSlice> = (
  set,
  get
) => ({
  cart: getInitialCart(),
  total: 0,

  addItem: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [...state.cart, { ...item, quantity: 1 }];
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

      return {
        cart: updatedCart,
        total: get().calculateTotal(),
      };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const updatedCart = state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));

      return {
        cart: updatedCart,
        total: get().calculateTotal(),
      };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ cart: [], total: 0 });
  },

  calculateTotal: () => {
    const { cart } = get();
    return cart.reduce(
      (total, item) => total + item.priceInCents * item.quantity,
      0
    );
  },
});
