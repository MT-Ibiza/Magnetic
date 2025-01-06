import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, addToCart, removeCart } from '../apis/api-cart';

export const useCart = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Cart>({
      queryKey: [`cart`],
      queryFn: async () => {
        return getCart();
      },
      enabled: true,
    });

  const addItemToCart = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      addToCart(itemId, quantity),
    onSuccess: () => {
      refetch();
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
    addItemToCart,
    removeAllItemsCart,
    data,
  };
};
