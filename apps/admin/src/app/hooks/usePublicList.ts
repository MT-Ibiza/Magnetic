import { PublicList } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getList } from '../apis/api-public-lists';

export function usePublicList(listId: number) {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<PublicList>({
      queryKey: [`list-${listId}`],
      queryFn: async () => {
        return getList(listId);
      },
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
