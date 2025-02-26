import { CartItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';
import { formatDate } from '../../utils';
import CheckoutItemEdit from './checkout-item-edit';
import CheckoutItemRemove from './checkout-item-remove';
import { placeholderItemImage } from '../../constants';

interface Props {
  cartItem: CartItem;
}

function CheckoutItem(props: Props) {
  const { cartItem } = props;
  const { item } = cartItem;
  const image =
    item.images?.length > 0 ? item.images[0].url : placeholderItemImage;
  const serviceType = item.service?.serviceType;
  const formType = item.category?.formType || item.service?.serviceType;

  return (
    <div className="lg:flex grid grid-cols-4 lg:justify-between w-full">
      <div className="grid grid-cols-2 col-span-3 lg:flex lg:gap-3">
        <div className="lg:w-20 lg:h-20">
          <img
            className="w-[90%] h-[100px] rounded-[8px] lg:w-full lg:h-full object-cover"
            src={image}
            alt={item.name}
          />
        </div>
        <div>
          {serviceType === 'boat_rental' && (
            <BoatsInfo cartItem={cartItem} formType={formType} />
          )}
          {serviceType === 'transfer' && (
            <TransferInfo cartItem={cartItem} formType={formType} />
          )}
          {serviceType === 'chefs' && (
            <ChefsInfo cartItem={cartItem} formType={formType} />
          )}
          {serviceType === 'drinks' && (
            <DrinkInfo cartItem={cartItem} formType={formType} />
          )}
        </div>
      </div>
      <div className="col-span-1 flex items-end flex-col">
        <Text>Total</Text>
        <Text className="mb-2 text-green-800">
          {centsToEurosWithCurrency(cartItem.quantity * item.priceInCents)}
        </Text>
        <CheckoutItemRemove cartItem={cartItem} />
      </div>
    </div>
  );
}

const TransferInfo = ({
  cartItem,
  formType,
}: {
  cartItem: CartItem;
  formType: string;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <div className="flex gap-2">
          <Text size="1">Pick up: {cartItem.formData.pickUpLocation}</Text>
          <Text className="text-gray-400">/</Text>
          <Text size="1">Drop off: {cartItem.formData.dropOffLocation}</Text>
        </div>
      </>
    )}
    <CheckoutItemEdit
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
    />
  </div>
);

const BoatsInfo = ({
  cartItem,
  formType,
}: {
  cartItem: CartItem;
  formType: string;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Time: {cartItem.formData.startTime}</Text>
      </>
    )}
    <CheckoutItemEdit
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
    />
  </div>
);

const ChefsInfo = ({
  cartItem,
  formType,
}: {
  cartItem: CartItem;
  formType: string;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Location: {cartItem.formData.location}</Text>
      </>
    )}
    <CheckoutItemEdit
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
    />
  </div>
);

const DrinkInfo = ({
  cartItem,
  formType,
}: {
  cartItem: CartItem;
  formType: string;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    <Text size="1">
      {cartItem.quantity} x{' '}
      {centsToEurosWithCurrency(cartItem.item.priceInCents)}
    </Text>
  </div>
);

export default CheckoutItem;
