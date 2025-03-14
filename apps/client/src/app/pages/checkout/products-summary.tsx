import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';
import { calculateTotalCartItems, groupCartItemsByCategory } from '../../utils';
import CheckoutItem from './checkout-item';
import { Text } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import { DRINKS_MINIMUM } from '../../constants';

function ProductsSummary() {
  const { cart } = useCartStore();
  const itemsByCategory = groupCartItemsByCategory(cart);

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
              <div className="flex flex-col gap-3">
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

export default ProductsSummary;
