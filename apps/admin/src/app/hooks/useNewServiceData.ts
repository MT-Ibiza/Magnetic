import { Package, Provider, Service } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getNewServiceData } from '../apis/api-services';

export const useNewServiceData = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<{
    providers: Provider[];
    packages: Package[];
  }>({
    queryKey: [`service-new-data`],
    queryFn: async () => {
      return getNewServiceData();
    },
  });

  return {
    isLoading,
    isError,
    data,
    error,
    refetch,
  };
};
