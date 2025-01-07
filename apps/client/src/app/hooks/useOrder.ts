import { Order } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../apis/api-order';

export const useOrder = (id: number) => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Order>({
      queryKey: [`order_${id}`],
      queryFn: async () => {
        return getOrder(id);
      },
    });

  return {
    isLoading,
    isError,
    isSuccess,
    order: data,
    error,
    refetch,
    data,
  };
};
