import { Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getItemsByService } from '../apis/api-public-lists';

export function useListServiceItems(type: string) {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Item[]
  >({
    queryKey: [`items-${type}`],
    queryFn: async () => {
      return getItemsByService(type);
    },
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    items: data || [],
    refetch,
    error,
  };
}
