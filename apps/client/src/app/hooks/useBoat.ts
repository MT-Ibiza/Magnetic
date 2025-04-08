import { Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getBoatItem } from '../apis/api-items';

export const useBoat = (itemId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Item>({
    queryKey: [`boat_${itemId}`],
    queryFn: async () => {
      return getBoatItem(itemId);
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
