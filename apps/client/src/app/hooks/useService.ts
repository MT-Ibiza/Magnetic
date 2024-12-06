import { Service, User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getService } from '../apis/api-services';

export const useService = (serviceId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Service>({
    queryKey: [`service_${serviceId}_client`],
    queryFn: async () => {
      return getService(serviceId);
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
