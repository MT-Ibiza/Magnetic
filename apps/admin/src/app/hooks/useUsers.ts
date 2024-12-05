import { useInfiniteQuery } from '@tanstack/react-query';
import { getUsers } from '../apis/api-users';
import { SearchUsersParams } from '@magnetic/interfaces';

export const useUsers = (params: SearchUsersParams) => {
  const { searchText, role, itemsPerPage } = params;

  const fetchUsers = async ({
    search,
    page,
    pageSize,
  }: {
    search?: string;
    page?: number;
    pageSize?: number;
  }) => {
    const data = await getUsers({
      searchText: search,
      page: page || 1,
      itemsPerPage: itemsPerPage || pageSize || 20,
      role,
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
    queryKey: ['users', searchText],
    queryFn: async ({ pageParam }) => {
      return fetchUsers({
        search: searchText,
        page: pageParam,
        pageSize: 20,
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
    users: data?.pages.flatMap((page) => page.users) || [],
    usersAsOptions:
      data?.pages[0]?.users.map((user) => {
        return {
          label: user.name,
          value: user.id,
          user,
        };
      }) || [],
  };
};
