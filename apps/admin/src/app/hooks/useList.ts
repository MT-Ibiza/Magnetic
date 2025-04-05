import { DrinksList } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getList } from '../apis/api-lists-items';

export function useList(listId: number) {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<DrinksList>({
      queryKey: [`list=${listId}`],
      queryFn: async () => {
        return getList(listId);
      },
      refetchOnWindowFocus: false,
    });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    refetch,
    error,
  };
}
