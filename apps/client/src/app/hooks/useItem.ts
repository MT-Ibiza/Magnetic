import { Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getItem } from '../apis/api-items';

export const useItem = (serviceId: number, itemId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Item>({
    queryKey: [`service_${serviceId}`],
    queryFn: async () => {
      return getItem(serviceId, itemId);
    },
  });

  return {
    isLoading,
    isError,
    data,
    item: data,
    error,
    refetch,
  };
};
