import { StateCreator } from 'zustand';
import { StoreState } from '../store';
import { CartItem } from '@magnetic/interfaces';

const CART_STORAGE_KEY = 'cart_guest_state';

export type GuestCartSlice = {
  guestCart: CartItem[];
  totalGuestCart: number;
  totalDrinksGuestCart: number;
  addItemGuestCart: (item: CartItem) => void;
  removeGuestCartService: (id: number) => void;
  removeGuestCartItem: (id: number) => void;
  clearGuestCart: () => void;
  calculateTotalGuestCart: () => number;
  getGroupedItemsByServiceGuestCart: () => {
    [serviceId: string]: { service: any; items: CartItem[] };
  };
};

export const createGuestCartSlice: StateCreator<
  StoreState,
  [],
  [],
  GuestCartSlice
> = (set, get) => ({
  guestCart: [],
  totalGuestCart: 0,
  totalDrinksGuestCart: 0,
  addItemGuestCart: (item) => {
    set((state) => {
      const existingItem = state.guestCart.find(
        (cartItem) => cartItem.id === item.id
      );
      let updatedCart;

      if (existingItem && item.quantity > 1) {
        updatedCart = state.guestCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCart = [
          ...state.guestCart,
          { ...item, quantity: item.quantity, id: item.id },
        ];
      }

      const isDrink = item.item.service.serviceType === 'drinks';
      set({
        totalDrinksGuestCart: isDrink
          ? get().totalDrinksGuestCart + 1
          : get().totalDrinksGuestCart,
      });
      // localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
      return {
        guestCart: updatedCart,
        totalGuestCart: get().calculateTotalGuestCart(),
      };
    });
  },
  removeGuestCartService: (id) => {
    set((state) => {
      const updatedCart = state.guestCart.filter((item) => item.id !== id);
      return {
        guestCart: updatedCart,
        totalGuestCart: get().calculateTotalGuestCart(),
      };
    });
  },
  removeGuestCartItem: (id) => {
    set((state) => {
      const itemToRemove = state.guestCart.find((item) => item.id === id);
      if (!itemToRemove) return state;

      const updatedCart = state.guestCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      const isDrink = itemToRemove.item.service.serviceType === 'drinks';
      const newTotalDrinks = isDrink
        ? get().totalDrinksGuestCart - 1
        : get().totalDrinksGuestCart;

      return {
        guestCart: updatedCart,
        totalGuestCart: get().calculateTotalGuestCart(),
        totalDrinksGuestCart: newTotalDrinks,
      };
    });
  },
  clearGuestCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ guestCart: [], totalGuestCart: 0, totalDrinksGuestCart: 0 });
  },

  calculateTotalGuestCart: () => {
    const { cart } = get();
    return cart.reduce(
      (total, cartItem) =>
        total + cartItem.item.priceInCents * cartItem.quantity,
      0
    );
  },

  getGroupedItemsByServiceGuestCart: () => {
    const { guestCart } = get();
    const grouped = guestCart.reduce((groups: any, cartItem: CartItem) => {
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
