import { CartItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';
import { formatDate } from '../../utils';
import CheckoutItemButtons from './checkout-item-edit';
import CheckoutItemEdit from './checkout-item-edit';
import CheckoutItemRemove from './checkout-item-remove';
import ItemCounter from '../../components/items/item-counter';

interface Props {
  cartItem: CartItem;
}

const defaultImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU';

function CheckoutItem(props: Props) {
  const { cartItem } = props;
  const { item } = cartItem;
  const image = item.images.length > 0 ? item.images[0].url : defaultImage;
  const serviceType = item.service?.serviceType;

  return (
    <div className="flex justify-between w-full">
      <div className="flex gap-3">
        <div className="w-5 h-5 lg:w-20 lg:h-20">
          <img
            className="w-[20px] h-[20px] rounded-[8px] lg:w-full lg:h-full object-cover"
            src={image}
            alt={item.name}
          />
        </div>
        <div>
          {serviceType === 'boat_rental' && <BoatsInfo cartItem={cartItem} />}
          {serviceType === 'transfer' && <TransferInfo cartItem={cartItem} />}
          {serviceType === 'chefs' && <ChefsInfo cartItem={cartItem} />}
          {serviceType === 'drinks' && <DrinkInfo cartItem={cartItem} />}
        </div>
      </div>
      <div className="flex items-end flex-col">
        <Text>Total</Text>
        <Text className="mb-2 text-green-800">
          {centsToEurosWithCurrency(cartItem.quantity * item.priceInCents)}
        </Text>
        <CheckoutItemRemove item={item} />
      </div>
    </div>
  );
}

const TransferInfo = ({ cartItem }: { cartItem: CartItem }) => (
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
      serviceType={cartItem.item.service.serviceType}
      item={cartItem.item}
    />
  </div>
);

const BoatsInfo = ({ cartItem }: { cartItem: CartItem }) => (
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
      serviceType={cartItem.item.service.serviceType}
      item={cartItem.item}
    />
  </div>
);

const ChefsInfo = ({ cartItem }: { cartItem: CartItem }) => (
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
      serviceType={cartItem.item.service.serviceType}
      item={cartItem.item}
    />
  </div>
);

const DrinkInfo = ({ cartItem }: { cartItem: CartItem }) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    <Text size="1">
      {cartItem.quantity} x{' '}
      {centsToEurosWithCurrency(cartItem.item.priceInCents)}
    </Text>
  </div>
);

export default CheckoutItem;
