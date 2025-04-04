import { DashboardData, Service, User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getDrinkService } from '../apis/api-drinks';

export const useDrinksServices = () => {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<Service>({
      queryKey: [`drinks-service`],
      queryFn: async () => {
        return getDrinkService();
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
};
