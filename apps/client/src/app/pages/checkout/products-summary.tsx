import {
  calculateTotalCartItems,
  centsToEurosWithCurrency,
  findICartItemDrink,
} from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';
import { formatDate, groupCartItemsByCategory } from '../../utils';
import CheckoutItem from './checkout-item';
import { Text } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import { DRINKS_MINIMUM } from '../../constants';
import CheckoutItemEdit from './checkout-item-edit';
import { CartItem } from '@magnetic/interfaces';

function ProductsSummary() {
  const { cart } = useCartStore();
  const itemsByCategory = groupCartItemsByCategory(cart);
  const drinkItem = findICartItemDrink(cart);

  return (
    <div>
      {itemsByCategory.map((category) => {
        const totalCategoryItems = calculateTotalCartItems(category.items);
        const isDrinksCategory = category.type === 'drinks';
        const missingAmount = DRINKS_MINIMUM - totalCategoryItems;

        return (
          <div key={category.categoryId}>
            {isDrinksCategory && totalCategoryItems < DRINKS_MINIMUM && (
              <div className="text-blue-800 bg-blue-100 p-3 mb-3 rounded-sm">
                <div className="flex justify-between">
                  <Text size="1">
                    You're {centsToEurosWithCurrency(missingAmount)} away from
                    the €700 minimum required for drink orders.
                  </Text>
                  <Link
                    className="text-sm underline"
                    to={`/services/${category.categoryId}`}
                  >
                    Add Drinks
                  </Link>
                </div>
              </div>
            )}
            <div className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {category.category}
              </h3>
              {category.type === 'drinks' && drinkItem && (
                <DrinkInfo drinkItem={drinkItem} />
              )}
              <div className="flex flex-col gap-4">
                {category.items.map((item) => (
                  <CheckoutItem cartItem={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DrinkInfo = ({ drinkItem }: { drinkItem: CartItem }) => (
  <div className="flex justify-between w-full mb-5">
    <div className="flex gap-2">
      <Text size="1">Location: {drinkItem.formData.location}</Text>
      <Text className="text-gray-400">/</Text>
      <Text size="1">{formatDate(drinkItem.formData.date)}</Text>
    </div>
    <CheckoutItemEdit
      formData={drinkItem.formData}
      formType={'drinks'}
      item={drinkItem.item}
      cartItemId={drinkItem.id}
    />
  </div>
);

export default ProductsSummary;
