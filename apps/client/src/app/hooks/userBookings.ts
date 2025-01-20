import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../apis/api-bookings'; 
import { BookingForm } from '@magnetic/interfaces';

export const useBookings = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } = useQuery<BookingForm[]>({
    queryKey: [`bookings`],
    queryFn: async () => {
      return getBookings();
    },
    enabled: true, 
  });

  return {
    isLoading,
    isError,
    isSuccess,
    bookings: data,
    bookingsOptions:
    data?.map((booking) => {
      return {
        label: `Booking #${booking.id}`,
        value: booking.id,
      };
    }) || [],
    error,
    refetch,
  };
};
