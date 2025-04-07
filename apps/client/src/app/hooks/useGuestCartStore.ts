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
    getGroupedItemsByService,
  } = useAppStore();

  return {
    guestCart,
    totalGuestCart,
    totalDrinksGuestCart,
    addItemGuestCart,
    removeGuestCartService,
    removeGuestCartItem,
    clearGuestCart,
    calculateTotalGuestCart,
    getGroupedItemsByService,
  };
}
