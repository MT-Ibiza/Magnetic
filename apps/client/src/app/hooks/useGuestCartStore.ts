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
    guestCart,
    totalGuestCart,
    totalDrinksGuestCart,
    addItemGuestCart,
    removeGuestCartService,
    removeGuestCartItem,
    clearGuestCart,
    calculateTotalGuestCart,
    getGroupedItemsByServiceGuestCart,
  };
}
