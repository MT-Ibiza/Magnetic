import { Service, User } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getBoatService } from '../apis/api-services';

export const useServiceBoats = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<Service>({
    queryKey: [`boat_service_public`],
    queryFn: async () => {
      return getBoatService();
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
