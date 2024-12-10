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
    <div className="border rounded-xl border-neutral-200 p-4 space-y-4 shadow-sm hover:border-primary-700 transition-shadow">
      <div className="flex gap-5">
        <img
          className="object-cover rounded-lg h-[125px] w-[125px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
          alt={item.name}
        />
        <div className="flex flex-col w-full">
          <div className="w-full pb-2 flex justify-between items-start">
            <h2 className="text-lg font-semibold text-primary">{item.name}</h2>
            <h2 className="text-lg font-semibold text-secondary">
              {centsToEurosWithCurrency(item.priceInCents)}
            </h2>
          </div>
          <Text className="line-clamp-4 text-gray-600">{item.description}</Text>
          <div className="flex items-center justify-end gap-4 mt-4">
            <button
              onClick={() => removeItem(item.id)}
              className="bg-primary-400 text-white px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
            >
              -
            </button>
            <span className="text-lg font-semibold text-gray-800">
              {productCart?.quantity || 0}
            </span>
            <button
              onClick={() => addItem(item)}
              className="bg-primary-400 text-white px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCardCounter;
