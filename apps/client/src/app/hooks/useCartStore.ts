import { useAppStore } from '../store/store';

export function useCartStore() {
  const {
    cart,
    total,
    addItem,
    removeItem,
    removeService,
    clearCart,
    calculateTotal,
    getGroupedItemsByService,
    totalDrinks,
  } = useAppStore();

  return {
    cart,
    total,
    addItem,
    removeItem,
    removeService,
    clearCart,
    calculateTotal,
    getGroupedItemsByService,
    totalDrinks,
  };
}
