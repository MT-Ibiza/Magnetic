import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../apis/api-bookings';
import { BookingUser } from '@magnetic/interfaces';

export const useBookings = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } = useQuery<
    BookingUser[]
  >({
    queryKey: [`user-bookings`],
    queryFn: async () => {
      return getBookings();
    },
    enabled: true,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    bookings: data || [],
    error,
    refetch,
  };
};
