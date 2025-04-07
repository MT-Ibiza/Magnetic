import { Cart, EditCartItem } from '@magnetic/interfaces';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  removeServiceCart,
  createItemBoatToCart,
  deleteCartItem,
  addItemCartDrink,
  updateFormCartItem,
} from '../apis/api-cart';
import { addItemBoatToGuestCart, getGuestCart } from '../apis/api-guest-cart';

export const useGuestCartActions = () => {
  const { isLoading, isError, data, error, refetch, isSuccess } =
    useQuery<Cart>({
      queryKey: [`cart`],
      queryFn: async () => {
        return getGuestCart();
      },
      enabled: true,
    });

  const addBoatToCart = useMutation({
    mutationFn: (params: {
      itemId: number;
      formData: any;
      seasonId?: number;
    }) => addItemBoatToGuestCart(params),
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
      // refetch();
    },
  });

  const removeItemCart = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      // refetch();
    },
  });

  const editFormItemCart = useMutation({
    mutationFn: (params: EditCartItem) => updateFormCartItem(params),
    onSuccess: () => {
      // refetch();
    },
  });

  return {
    addDrinkToCart,
    removeAllItemsCart,
    removeItemCart,
    addBoatToCart,
    editFormItemCart,
  };
};
