import { Text } from '@magnetic/ui';
import { Item } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
  serviceType: string;
}
const servicesNoDetails = ['drinks'];

function ItemDescription(props: Props) {
  const { item, serviceType } = props;
  const customDetailsServices = ['drinks', 'chefs', 'transfer', 'boat_rental'];

  return (
    <>
      {customDetailsServices.includes(serviceType) ? (
        <>
          {serviceType === 'drinks' && (
            <DrinkInfo
              name={item.name}
              size={item.drinkAttributes?.size}
              quantity={item.drinkAttributes?.units || 0}
            />
          )}
          {serviceType === 'chefs' && <ChefInfo name={item.name} />}
          {serviceType === 'transfer' && (
            <TransferInfo
              capacity={item.boatAttributes?.capacity || 0}
              name={item.name}
            />
          )}
          {serviceType === 'boat_rental' && (
            <BoatInfo
              name={item.name}
              price={centsToEurosWithCurrency(item.priceInCents)}
              secondName={item.boatAttributes?.secondName}
              capacity={item.boatAttributes?.capacity || 0}
            />
          )}
        </>
      ) : (
        <DefaultProductInfo name={item.name} description={item.description} />
      )}
    </>
  );
}

const DefaultProductInfo = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="w-full pb-2 flex flex-col gap-3">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <Text className="line-clamp-4 flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      {description}
    </Text>
  </div>
);

const DrinkInfo = ({
  name,
  size,
  quantity,
}: {
  name: string;
  size?: string;
  quantity?: number;
}) => (
  <div className="space-y-2 flex flex-col">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      {quantity && (
        <>
          <span className="">{size}</span>
          <span>x</span>
        </>
      )}
      <span className="">{quantity}</span>
    </div>
  </div>
);

const ChefInfo = ({ name }: { name: string }) => (
  <div>
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
  </div>
);

const TransferInfo = ({
  name,
  capacity,
}: {
  name: string;
  capacity: number;
}) => (
  <div className="space-y-2 flex flex-col">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      <span className="">{capacity} capacity </span>
    </div>
  </div>
);

const BoatInfo = ({
  name,
  capacity,
  secondName,
  price,
}: {
  name: string;
  capacity: number;
  secondName?: string;
  price?: string;
}) => (
  <div className="space-y-2 flex flex-col">
    <h2 className={`capitalize ${'text-base font-medium'}`}>
      <span className="line-clamp-1">{name}</span>
    </h2>
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      {secondName && (
        <>
          <span className="">{secondName}</span>
          <span>-</span>
        </>
      )}
      <span className="">{capacity} capacity </span>
    </div>
  </div>
);

export default ItemDescription;
