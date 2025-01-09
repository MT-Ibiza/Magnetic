import { BookingForm } from '@magnetic/interfaces';
import { getBookingsOrders, getOrders } from '../apis/api-orders';
import { useQuery } from '@tanstack/react-query';

export function useBookings() {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    BookingForm[]
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
    bookingsOptions:
      data?.map((booking) => {
        return {
          label: `Booking #${booking.id}`,
          value: booking.id,
        };
      }) || [],
    refetch,
    error,
  };
}
