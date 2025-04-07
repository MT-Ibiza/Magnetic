import { useAppStore } from '../store/store';

export function useGuestCartStore() {
  const {
    guestCart,
    totalGuestCart,
    totalDrinksGuestCart,
    addItemGuestCart,
    removeGuestCartService,
    removeGuestCartItem,
    clearGuestCart,
    calculateTotalGuestCart,
    getGroupedItemsByServiceGuestCart,
  } = useAppStore();

  return {
    cart: guestCart,
    total: totalGuestCart,
    addItem: addItemGuestCart,
    removeItem: removeGuestCartItem,
    removeService: removeGuestCartService,
    clearCart: clearGuestCart,
    calculateTotal: calculateTotalGuestCart,
    getGroupedItemsByService: getGroupedItemsByServiceGuestCart,
    totalDrinks: totalDrinksGuestCart,
  };
}
