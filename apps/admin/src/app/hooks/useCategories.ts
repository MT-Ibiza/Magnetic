import { Category } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../apis/api-categories';

export const useCategories = () => {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Category[]
  >({
    queryKey: [`categories`],
    queryFn: async () => {
      return getCategories();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    categories: data || [],
    categoriesOptions:
      data?.map((category) => {
        return {
          label: category.name,
          value: category.id,
        };
      }) || [],
    refetch,
    error,
  };
};
