import { Item, Service } from '@magnetic/interfaces';
import ItemCard from '../../components/items/item-card';
import { groupItemsByCategory } from '@magnetic/utils';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: Service;
}
function ListProducts(props: Props) {
  const { items, availableInPlan, service } = props;
  const servicesMultiple = ['drinks'];
  const itemsGroup = groupItemsByCategory(items);
  const isDrinksService = service.serviceType === 'drinks';

  return (
    <>
      {itemsGroup.map((group, index) => (
        <div key={index} className="pt-[30px]">
          <h2 className="text-2xl font-semibold">{group.category}</h2>
          <div
            className={`grid pt-[30px] gap-6 md:gap-8 sm:grid-cols-2 ${
              isDrinksService ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {group.items.map((item, index) => (
              <div key={index}>
                <ItemCard
                  service={service}
                  item={item}
                  availableInPlan={availableInPlan}
                  noFillForm={servicesMultiple.includes(service.serviceType)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default ListProducts;
