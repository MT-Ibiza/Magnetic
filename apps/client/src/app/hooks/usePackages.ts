import { Package } from '@magnetic/interfaces';
import { getPackages } from '../apis/api-packages';
import { useQuery } from '@tanstack/react-query';

export function usePackages() {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Package[]
  >({
    queryKey: [`packages`],
    queryFn: async () => {
      return getPackages();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    packages: data || [],
    packagesOptions:
      data?.map((packagePlan) => {
        return {
          label: packagePlan.name,
          value: packagePlan.id,
        };
      }) || [],
    refetch,
    error,
  };
}
