import { BoatAttributes, Item, Service } from '@magnetic/interfaces';
import ItemCounter from '../../components/items/item-counter';
import { Alert, Button, Text } from '@magnetic/ui';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: Service;
}

function ListProducts(props: Props) {
  const { items, availableInPlan, service } = props;

  const servicesMultiple = ['drinks'];

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <ItemCounter
              service={service}
              item={item}
              availableInPlan={availableInPlan}
              noFillForm={servicesMultiple.includes(service.serviceType)}
            >
              {service.serviceType === 'boat_rental' && (
                <BoatInfo
                  name={item.name}
                  secondName={item.boatAttributes?.secondName}
                  guests={item.boatAttributes?.guests || 0}
                />
              )}
            </ItemCounter>
          </div>
        ))}
      </div>
    </>
  );
}

const BoatInfo = ({
  name,
  guests,
  secondName,
}: {
  name: string;
  guests: number;
  secondName?: string;
}) => (
  <div>
    <h2 className="text-lg font-semibold text-primary">{name}</h2>
    {secondName && (
      <Text size="1" className="mb-2">
        {secondName}
      </Text>
    )}
    <Text size="1">{`Max Pax: ${guests}`}</Text>
  </div>
);

export default ListProducts;
