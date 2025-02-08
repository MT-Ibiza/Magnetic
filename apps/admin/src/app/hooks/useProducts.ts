import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getProducts, updatePublishStatus } from '../apis/api-products';
import { Item, SearchItemParams } from '@magnetic/interfaces';

export const useProducts = (params: SearchItemParams) => {
  const { searchText, categoryId, itemsPerPage, serviceId } = params;
  const fetchProducts = async ({
    search,
    page,
    pageSize,
    categoryId,
    serviceId,
  }: {
    search?: string;
    page?: number;
    pageSize?: number;
    categoryId?: number;
    serviceId?: number;
  }) => {
    const data = await getProducts({
      searchText: search,
      page: page || 1,
      itemsPerPage: itemsPerPage || pageSize || 20,
      categoryId,
      serviceId,
    });
    return data;
  };

  const publishOrUnpublishItemApi = useMutation<
    Item,
    Error,
    { itemId: number; isPublished: boolean }
  >({
    mutationFn: (params) => {
      return updatePublishStatus(params);
    },
  });

  const {
    isLoading,
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [`products`, searchText, categoryId, serviceId],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchProducts({
        search: searchText,
        page: pageParam,
        pageSize: 10,
        categoryId,
        serviceId,
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
    products: data?.pages.flatMap((page) => page.products) || [],
    publishOrUnpublishItemApi,
  };
};
