import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, addToCart } from '../apis/api-cart';

export const useCart = () => {
  const { isLoading, isError, data, error, refetch } = useQuery<Cart>({
    queryKey: [`cart`],
    queryFn: async () => {
      return getCart(11);
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

  return {
    isLoading,
    isError,
    cart: data,
    error,
    refetch,
    addItemToCart,
    data,
  };
};
