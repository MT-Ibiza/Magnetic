import { User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '../apis/api-users';

export const useUser = (userId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<User>({
    queryKey: [`user_${userId}`],
    queryFn: async () => {
      return getUser(userId);
    },
  });

  return {
    isLoading,
    isError,
    user: data,
    error,
    refetch,
    data,
  };
};
