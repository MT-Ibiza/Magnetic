import { Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getDrinks } from '../apis/api-drinks';

export function useDrinksList() {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
    Item[]
  >({
    queryKey: [`all-drinks`],
    queryFn: async () => {
      return getDrinks();
    },
    refetchOnWindowFocus: false,
  });

  return {
    isLoading,
    isError,
    isSuccess,
    data,
    drinks: data || [],
    refetch,
    error,
  };
}
