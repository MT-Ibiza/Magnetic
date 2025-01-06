import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, addToCart } from '../apis/api-cart';

export const useCart = (userId: number) => {
  const { isLoading, isError, data, error, refetch } = useQuery<Cart>({
    queryKey: [`cart_${userId}`],
    queryFn: async () => {
      return getCart(userId);
    },
    enabled: !!userId,
  });

  const addItemToCart = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: number; quantity: number }) =>
      addToCart(userId, itemId, quantity),
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
