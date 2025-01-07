import { Order } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../apis/api-order';

export const useOrders = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } = useQuery<
    Order[]
  >({
    queryKey: [`orders`],
    queryFn: async () => {
      return getOrders();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    orders: data || [],
    error,
    refetch,
    data,
  };
};
