import { Item } from '@magnetic/interfaces';
import ItemDrinkCard from './item-drink-card';
import ItemSpaCard from './item-spa-card';
import ItemDefaultCard from './item-default-card';
import ItemChefsCard from './item-chefs-card';
import ItemTransferCard from './item-transfer-card';
import ItemWellnessCard from './item-wellness-card';
import ItemDefaultServiceCard from './item-default-service-card';

interface ItemCardProps {
  item: Item;
  serviceType: string;
  cartItem?: { quantity: number };
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
  onClickBookNow: () => void;
}

function ItemCard({
  item,
  serviceType,
  cartItem,
  onClickAdd,
  onClickRemove,
  onClickBookNow,
}: ItemCardProps) {
  const currentAmount = cartItem?.quantity || 0;
  switch (serviceType) {
    case 'drinks':
      return (
        <ItemDrinkCard
          item={item}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
          cartItemAmount={currentAmount}
        />
      );
    case 'chefs':
      return (
        <ItemChefsCard
          item={item}
          cartItemAmount={currentAmount}
          onClickBookNow={onClickBookNow}
        />
      );
    case 'transfer':
      return (
        <ItemTransferCard
          item={item}
          cartItemAmount={currentAmount}
          onClickBookNow={onClickBookNow}
        />
      );
    case 'wellness':
      return (
        <ItemWellnessCard
          item={item}
          cartItemAmount={currentAmount}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
        />
      );
    case 'spa':
      return (
        <ItemSpaCard
          item={item}
          cartItemAmount={currentAmount}
          onClickBookNow={onClickBookNow}
        />
      );
    case 'childcare':
      return (
        <ItemDefaultServiceCard
          item={item}
          cartItemAmount={currentAmount}
          onClickBookNow={onClickBookNow}
        />
      );
    case 'security':
      return (
        <ItemDefaultServiceCard
          item={item}
          cartItemAmount={currentAmount}
          onClickBookNow={onClickBookNow}
        />
      );
    default:
      return (
        <ItemDefaultCard
          item={item}
          cartItemAmount={currentAmount}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
        />
      );
  }
}

export default ItemCard;
