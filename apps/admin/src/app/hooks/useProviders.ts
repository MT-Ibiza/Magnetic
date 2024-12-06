import { Provider, Service } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getProviders } from '../apis/api-providers';

export const useProviders = () => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Provider[]
  >({
    queryKey: [`providers`],
    queryFn: async () => {
      return getProviders();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    providers: data || [],
    refetch,
    error,
  };
};
