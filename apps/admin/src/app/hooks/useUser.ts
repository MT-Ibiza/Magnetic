import { User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getBookings, getUser } from '../apis/api-users';

export const useUser = (userId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<User>({
    queryKey: [`user_${userId}`],
    queryFn: async () => {
      return getUser(userId);
    },
  });

  const { isLoading: isBookingsLoading, isError: isBookingsError, data: bookings, error: bookingsError } = useQuery({
    queryKey: [`bookings_${userId}`],
    queryFn: async () => {
      return getBookings(userId);
    },
    enabled: !!userId,
  });

  return {
    isLoading,
    isError,
    user: data,
    error,
    bookings,
    refetch,
    data,
  };
};
