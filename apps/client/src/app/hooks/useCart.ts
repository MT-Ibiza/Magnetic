import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCart,
  createItemCartService,
  removeServiceCart,
  createItemCartProduct,
  createItemBoatToCart,
} from '../apis/api-cart';

export const useCart = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Cart>({
      queryKey: [`cart`],
      queryFn: async () => {
        return getCart();
      },
      enabled: true,
    });

  const addServiceToCart = useMutation({
    mutationFn: ({
      itemId,
      cartItemId,
      quantity,
      formData,
      variantId,
    }: {
      itemId: number;
      cartItemId?: number;
      quantity: number;
      formData?: any;
      variantId?: number;
    }) =>
      createItemCartService({
        itemId,
        cartItemId,
        quantity,
        formData,
        variantId,
      }),
    onSuccess: () => {
      // refetch();
    },
  });

  const addProductToCart = useMutation({
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
    }) => createItemCartProduct({ itemId, cartItemId, quantity, formData }),
    onSuccess: () => {
      // refetch();
    },
  });

  const addBoatToCart = useMutation({
    mutationFn: (params: {
      itemId: number;
      formData: any;
      seasonId?: number;
    }) => createItemBoatToCart(params),
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
    addServiceToCart,
    addProductToCart,
    removeAllItemsCart,
    addBoatToCart,
    data,
  };
};
