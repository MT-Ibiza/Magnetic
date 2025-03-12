import { BookingUser } from '@magnetic/interfaces';
import { getBooking } from '../apis/api-orders';
import { useQuery } from '@tanstack/react-query';

export function useBooking(bookingId: number) {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<BookingUser>({
      queryKey: [`booking_${bookingId}`],
      queryFn: async () => {
        return getBooking(bookingId);
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    refetch,
    error,
  };
}
