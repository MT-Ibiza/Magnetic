import { useInfiniteQuery } from '@tanstack/react-query';
import { getBookingsOrders } from '../apis/api-orders';

export const useBookings = ({ itemsPerPage }: { itemsPerPage: number }) => {
  const fetchUsers = async ({
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    const data = await getBookingsOrders({
      page: page || 1,
      itemsPerPage: itemsPerPage || pageSize || 20,
    });
    return data;
  };

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`bookings_admin`],
    queryFn: async ({ pageParam }) => {
      return fetchUsers({
        page: pageParam,
        pageSize: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      if (nextPage <= lastPage.totalPages) {
        return nextPage;
      }
    },
  });

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    bookings: data?.pages.flatMap((page) => page.bookings) || [],
  };
};
