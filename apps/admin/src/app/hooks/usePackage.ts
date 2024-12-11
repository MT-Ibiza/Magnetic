import { Package } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getPackage } from '../apis/api-packages';

export const usePackage = (packageId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<{package: Package}>({
    queryKey: [`package_${packageId}`],
    queryFn: async () => {
      return getPackage(packageId);
    },
  });

  return {
    isLoading,
    isError,
    plan: data?.package,
    error,
    refetch,
    data,
  };
};
