import { Item, Service, User } from '@magnetic/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getService, updatePublishStatus } from '../apis/api-services';

export const useService = (serviceId: number) => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Service>({
      queryKey: [`service_${serviceId}`],
      queryFn: async () => {
        return getService(serviceId);
      },
    });

  const publishOrUnpublishItemApi = useMutation<
    Item,
    Error,
    { itemId: number; isPublished: boolean }
  >({
    mutationFn: (params) => {
      return updatePublishStatus(params);
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
    publishOrUnpublishItemApi,
  };
};
