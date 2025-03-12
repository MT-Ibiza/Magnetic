import { BookingForm, BookingUser } from '@magnetic/interfaces';
import { getBookingsOrders, getOrders } from '../apis/api-orders';
import { useQuery } from '@tanstack/react-query';

export function useBookings() {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    BookingUser[]
  >({
    queryKey: [`bookings`],
    queryFn: async () => {
      return getBookingsOrders();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    bookings: data || [],
    refetch,
    error,
  };
}
