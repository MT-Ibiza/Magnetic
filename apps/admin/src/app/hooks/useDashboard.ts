import { AdminDashboard } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getAdminDashboard } from '../apis/api-dashboard';

export function useAdminDashboard() {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<AdminDashboard>({
      queryKey: [`admin_dashboard`],
      queryFn: async () => {
        return getAdminDashboard();
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    newBookings: data ? data.new : [],
    activeBookings: data ? data.active : [],
    upcomingUsers: data ? data.upcoming : [],
    refetch,
    error,
  };
}
