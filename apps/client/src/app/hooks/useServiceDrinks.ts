import { Service, User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getDrinksService } from '../apis/api-services';

export const useServiceDrinks = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<Service>({
    queryKey: [`drinks_service_public`],
    queryFn: async () => {
      return getDrinksService();
    },
  });

  return {
    isLoading,
    isError,
    service: data,
    error,
    refetch,
    data,
  };
};
