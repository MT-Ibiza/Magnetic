import { Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {
  item: Item;
}

function ItemCardCounter(props: Props) {
  const { item } = props;
  const { cart, addItem, removeItem } = useCartStore();
  const productCart = cart.find((itemCart) => itemCart.id === item.id);

  return (
    <div className="border border-md p-5 flex flex-col items-center">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
        alt={item.name}
      />
      <div className="mb-3 text-lg font-semibold">{item.name}</div>
      <div className="text-gray-500">
        Precio: ${centsToEurosWithCurrency(item.priceInCents)}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => removeItem(item.id)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          -
        </button>
        <span>{productCart?.quantity || 0}</span>
        <button
          onClick={() => addItem(item)}
          className="bg-gray-200 px-2 py-1 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default ItemCardCounter;
