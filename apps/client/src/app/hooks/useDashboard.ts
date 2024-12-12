import { DashboardData } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getDashboard } from '../apis/api-dashboard';

export const useDashboard = () => {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<DashboardData>({
      queryKey: [`dashboard`],
      queryFn: async () => {
        return getDashboard();
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    packages: data?.packages || [],
    services: data?.services || [],
    refetch,
    error,
  };
};
