import { Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getPublicItem } from '../apis/api-public-list';

export const useListItem = (slug: string, itemId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Item>({
    queryKey: [`list_${slug}`],
    queryFn: async () => {
      return getPublicItem(slug, itemId);
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
