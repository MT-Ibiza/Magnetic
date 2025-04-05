import { PublicList } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getPublicList } from '../apis/api-public-list';

export const usePublicList = (slug: string) => {
  const { isLoading, isError, data, error, isSuccess, refetch } =
    useQuery<PublicList>({
      queryKey: [`list-${slug}`],
      queryFn: async () => {
        return getPublicList(slug);
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
};
