import { Order } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import { addToCart, removeCart } from '../apis/api-cart';
import { getOrder } from '../apis/api-order';

export const useOrder = (id: number) => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Order>({
      queryKey: [`order_${id}`],
      queryFn: async () => {
        return getOrder(id);
      },
      enabled: true,
    });

  const createOrder = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      addToCart(itemId, quantity),
    onSuccess: () => {
      // refetch();
    },
  });

  const removeAllItemsCart = useMutation({
    mutationFn: () => removeCart(),
    onSuccess: () => {
      refetch();
    },
  });

  return {
    isLoading,
    isError,
    isSuccess,
    cart: data,
    error,
    refetch,
    createOrder,
    removeAllItemsCart,
    data,
  };
};
