import { CartItem } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  formatTime,
  formatDate,
} from '@magnetic/utils';
import { Text } from '@magnetic/ui';
import { placeholderItemImage } from '../../constants';
import CheckoutItemEdit from './checkout-item-edit';
import CheckoutItemRemove from './checkout-item-remove';

interface Props {
  cartItem: CartItem;
  guestMode?: boolean;
}

function CheckoutItem(props: Props) {
  const { cartItem, guestMode } = props;
  const { item, priceInCents } = cartItem;
  const { service, images, category } = item;
  const image = images?.length > 0 ? images[0].url : placeholderItemImage;
  const serviceType = service?.serviceType;
  const formType = category?.formType || service?.serviceType;
  const price = priceInCents;

  const renderServiceInfo = () => {
    switch (serviceType) {
      case 'boat_rental':
        return (
          <BoatsInfo
            cartItem={cartItem}
            formType={formType}
            guestMode={guestMode}
          />
        );
      case 'transfer':
        return (
          <TransferInfo
            cartItem={cartItem}
            formType={formType}
            guestMode={guestMode}
          />
        );
      case 'chefs':
        return (
          <ChefsInfo
            cartItem={cartItem}
            formType={formType}
            guestMode={guestMode}
          />
        );
      case 'reservations':
        return (
          <ReservationInfo
            cartItem={cartItem}
            formType={formType}
            guestMode={guestMode}
          />
        );
      case 'drinks':
        return <DrinkInfo cartItem={cartItem} formType={formType} />;
      default:
        return (
          <DefaultServiceInfo
            cartItem={cartItem}
            formType={formType}
            guestMode={guestMode}
          />
        );
    }
  };

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
        <div>{renderServiceInfo()}</div>
      </div>
      <div className="col-span-1 flex items-end flex-col">
        <Text>Total</Text>
        <Text className="mb-2 text-green-800">
          {centsToEurosWithCurrency(cartItem.quantity * price)}
        </Text>
        <CheckoutItemRemove cartItem={cartItem} guestMode={guestMode} />
      </div>
    </div>
  );
}

const DefaultServiceInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Time: {formatTime(cartItem.formData.time)}</Text>
      </>
    )}
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
    />
  </div>
);

const TransferInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>
      {cartItem.item.name}{' '}
      {cartItem.variant ? `- ${cartItem.variant.name}` : ''}
    </h1>
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
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
    />
  </div>
);

const BoatsInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Time: {formatTime(cartItem.formData.startTime)}</Text>
      </>
    )}
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
    />
  </div>
);

const ReservationInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Venue: {cartItem.formData.venue}</Text>
      </>
    )}
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
    />
  </div>
);

const ChildcareInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Venue: {cartItem.formData.venue}</Text>
      </>
    )}
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
    />
  </div>
);

const ChefsInfo = ({
  cartItem,
  formType,
  guestMode,
}: {
  cartItem: CartItem;
  formType: string;
  guestMode?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <h1>{cartItem.item.name}</h1>
    {cartItem.formData && (
      <>
        <Text size="1">Date: {formatDate(cartItem.formData.date)}</Text>
        <Text size="1">Time: {formatTime(cartItem.formData.startTime)}</Text>
      </>
    )}
    <CheckoutItemEdit
      guestMode={guestMode}
      formData={cartItem.formData}
      formType={formType}
      item={cartItem.item}
      cartItemId={cartItem.id}
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
