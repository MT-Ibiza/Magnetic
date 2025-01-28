import { Item, Service } from '@magnetic/interfaces';
import ItemCardCounter from '../../components/items/item-card-counter';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: Service;
}

function ListProducts(props: Props) {
  const { items, availableInPlan, service } = props;

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, index) => (
          <div key={index}>
            <ItemCardCounter
              service={service}
              item={item}
              availableInPlan={availableInPlan}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default ListProducts;
