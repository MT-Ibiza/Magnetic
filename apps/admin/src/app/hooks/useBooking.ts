import { BookingForm } from '@magnetic/interfaces';
import { getBooking } from '../apis/api-orders';
import { useQuery } from '@tanstack/react-query';

export function useBooking(bookingId: number) {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<BookingForm>({
      queryKey: [`booking_${bookingId}`],
      queryFn: async () => {
        return getBooking(bookingId);
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    booking: data,
    data,
    refetch,
    error,
  };
}
