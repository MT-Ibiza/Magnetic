import { NewItemFromCategory } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getNewItem } from '../apis/api-items';

export const useNewItem = (serviceId: number) => {
  const { isLoading, isError, data, error, refetch } =
    useQuery<NewItemFromCategory>({
      queryKey: [`service_${serviceId}`],
      queryFn: async () => {
        return getNewItem(serviceId);
      },
    });

  return {
    isLoading,
    isError,
    service: data?.service,
    categories: data?.categories || [],
    error,
    refetch,
    data,
  };
};
