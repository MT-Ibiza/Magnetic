import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CartItem } from '@magnetic/interfaces';

const CART_STORAGE_KEY = 'cart_state';

export type CartSlice = {
  cart: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  totalDrinks: number;
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

      if (existingItem && item.quantity > 1) {
        updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [
          ...state.cart,
          { ...item, quantity: item.quantity, id: item.id },
        ];
      }

      const isDrink = item.item.service.serviceType === 'drinks';
      set({ totalDrinks: isDrink ? get().totalDrinks + 1 : get().totalDrinks });
      // localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
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
      (total, cartItem) =>
        total + cartItem.item.priceInCents * cartItem.quantity,
      0
    );
  },

  getGroupedItemsByService: () => {
    const { cart } = get();
    const grouped = cart.reduce((groups: any, cartItem: CartItem) => {
      const service = cartItem.item?.service;
      if (service && service.id) {
        const serviceId = service.id;
        if (!groups[serviceId]) {
          groups[serviceId] = { service: service, items: [] };
        }
        groups[serviceId].items.push(cartItem);
      }
      return groups;
    }, {});

    return grouped;
  },
});
