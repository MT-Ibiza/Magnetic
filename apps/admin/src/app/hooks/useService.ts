import { Service, User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getService } from '../apis/api-services';

export const useService = (serviceId: number) => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Service>({
      queryKey: [`service_${serviceId}`],
      queryFn: async () => {
        return getService(serviceId);
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    service: data,
    error,
    refetch,
    data,
  };
};
