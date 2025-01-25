import { UserBase } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getClient } from '../apis/api-client';

export const useClient = () => {
  const {
    isLoading: isClientLoading,
    isError: isClientError,
    data: clientData,
    error: clientError,
    refetch: refetchClient,
    isSuccess: isClientSuccess,
  } = useQuery<UserBase>({
    queryKey: ['client'],
    queryFn: async () => getClient(),
    enabled: true,
  });

  return {
    isClientLoading,
    isClientError,
    isClientSuccess,
    client: clientData,
    clientError,
    refetchClient,
  };
};
