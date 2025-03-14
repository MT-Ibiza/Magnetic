import { Service } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '../apis/api-services';

export const useServices = () => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Service[]
  >({
    queryKey: [`services`],
    queryFn: async () => {
      return getServices();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    services: data || [],
    refetch,
    data,
    error,
  };
};
