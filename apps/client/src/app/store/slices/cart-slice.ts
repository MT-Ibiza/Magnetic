import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CartItem } from '@magnetic/interfaces';

const CART_STORAGE_KEY = 'cart_state';

export type CartSlice = {
  cart: CartItem[];
  total: number;
  totalDrinks: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
  getGroupedItemsByService: () => {
    [serviceId: string]: { service: any; items: CartItem[] };
  };
};

export const createCartSlice: StateCreator<StoreState, [], [], CartSlice> = (
  set,
  get
) => ({
  cart: [],
  total: 0,
  totalDrinks: 0,

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

      const isDrink = item.item.service.serviceType === 'drinks';
      const newTotalDrinks = isDrink
        ? get().totalDrinks + item.quantity
        : get().totalDrinks;

      return {
        cart: updatedCart,
        total: get().calculateTotal(),
        totalDrinks: newTotalDrinks,
      };
    });
  },

  removeItem: (id) => {
    set((state) => {
      const itemToRemove = state.cart.find((item) => item.id === id);
      if (!itemToRemove) return state;

      const updatedCart = state.cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      const isDrink = itemToRemove.item.service.serviceType === 'drinks';
      const newTotalDrinks = isDrink
        ? Math.max(get().totalDrinks - 1, 0)
        : get().totalDrinks;

      return {
        cart: updatedCart,
        total: get().calculateTotal(),
        totalDrinks: newTotalDrinks,
      };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ cart: [], total: 0, totalDrinks: 0 });
  },

  calculateTotal: () => {
    return get().cart.reduce(
      (total, cartItem) =>
        total + cartItem.item.priceInCents * cartItem.quantity,
      0
    );
  },

  getGroupedItemsByService: () => {
    return get().cart.reduce((groups: any, cartItem: CartItem) => {
      const service = cartItem.item?.service;
      if (service?.id) {
        if (!groups[service.id]) {
          groups[service.id] = { service, items: [] };
        }
        groups[service.id].items.push(cartItem);
      }
      return groups;
    }, {});
  },
});
