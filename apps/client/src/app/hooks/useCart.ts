import { Cart } from '@magnetic/interfaces';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCart,
  createItemCartService,
  removeServiceCart,
  createItemCartProduct,
  createItemBoatToCart,
  deleteCartItem,
  addItemCartDrink,
  updateFormCartItem,
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

  const addDrinkToCart = useMutation({
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
    }) => addItemCartDrink({ itemId, cartItemId, quantity, formData }),
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

  const removeItemCart = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      refetch();
    },
  });

  const editFormItemCart = useMutation({
    mutationFn: (params: {
      itemId: number;
      cartItemId: number;
      formData: any;
    }) => updateFormCartItem(params),
    onSuccess: () => {
      // refetch();
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
    addDrinkToCart,
    removeAllItemsCart,
    removeItemCart,
    addBoatToCart,
    editFormItemCart,
    data,
  };
};
