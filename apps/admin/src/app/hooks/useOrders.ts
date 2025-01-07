import { Order } from '@magnetic/interfaces';
import { getOrders } from '../apis/api-orders';
import { useQuery } from '@tanstack/react-query';

export function useOrders() {
  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery<
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
    ordersOptions:
      data?.map((order) => {
        return {
          label: `Order #${order.id}`,
          value: order.id,
        };
      }) || [],
    refetch,
    error,
  };
}
