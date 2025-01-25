import { Item } from '@magnetic/interfaces';
import React from 'react';
import ItemCardCounter from '../../components/items/item-card-counter';

interface Props {
  items: Item[];
  availableInPlan: boolean;
}

function ListProducts(props: Props) {
  const { items, availableInPlan } = props;

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item, index) => (
        <div key={index}>
          <ItemCardCounter item={item} availableInPlan={availableInPlan} />
        </div>
      ))}
    </div>
  );
}

export default ListProducts;
