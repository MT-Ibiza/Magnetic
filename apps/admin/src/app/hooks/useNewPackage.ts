import { Package, Provider, Service } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getNewPackageData } from '../apis/api-packages';

export const useNewPackageData = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<{
    packages: Package[];
  }>({
    queryKey: [`service-new-data`],
    queryFn: async () => {
      return getNewPackageData();
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
