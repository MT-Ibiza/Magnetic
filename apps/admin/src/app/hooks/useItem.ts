import { ItemWithServiceCategories } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getItem } from '../apis/api-items';

export const useItem = (serviceId: number, itemId: number) => {
  const { isLoading, isError, data, error, refetch } =
    useQuery<ItemWithServiceCategories>({
      queryKey: [`service_${serviceId}`],
      queryFn: async () => {
        return getItem(serviceId, itemId);
      },
    });

  return {
    isLoading, 
    isError,
    item: data?.item,
    serviceCategories: data?.categories || [],
    error,
    refetch,
    data,
  };
};
