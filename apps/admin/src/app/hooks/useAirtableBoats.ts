import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoatsAirtable } from '../apis/api-airtable';

export const useAirtableBoats = () => {
  const fetchBoats = async ({ pageParam }: { pageParam?: string }) => {
    const data = await getBoatsAirtable({ offset: pageParam });
    return data;
  };

  const { isLoading, isError, data, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [`airtable_boats`],
      queryFn: fetchBoats,
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.offset || undefined,
    });

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    boats: data?.pages.flatMap((page) => page.records) || [],
  };
};
