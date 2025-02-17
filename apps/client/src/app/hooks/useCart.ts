import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCart, addServiceToCart, removeServiceCart } from '../apis/api-cart';

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
    mutationFn: ({
      itemId,
      cartItemId,
      quantity,
      formData,
    }: {
      itemId: number;
      cartItemId?: number;
      quantity: number;
      formData?: any;
    }) => addServiceToCart({ itemId, cartItemId, quantity, formData }),
    onSuccess: () => {
      // refetch();
    },
  });

  const removeAllItemsCart = useMutation({
    mutationFn: () => removeServiceCart(),
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
