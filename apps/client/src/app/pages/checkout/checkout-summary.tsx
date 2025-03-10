import { Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { calculateTotalsByService } from '../../utils';
import { centsToEurosWithCurrency } from '@magnetic/utils';

interface Props {}

function CheckoutSummary(props: Props) {
  const {} = props;
  const { cart } = useCartStore();
  const services = calculateTotalsByService(cart);

  const subtotal = services.reduce((a, b) => b.total + a, 0);
  const vat = subtotal * 0.21;
  const total = subtotal + vat;

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold mb-3">Summary order</h3>
      <div className="flex flex-col gap-2">
        {services.map((service, index) => (
          <div key={index} className="flex justify-between">
            <Text className="text-neutral-600 dark:text-neutral-300" size="2">
              {service.service}
            </Text>
            <Text.TextNumeric className="text-neutral-600 dark:text-neutral-300">
              {centsToEurosWithCurrency(service.total)}
            </Text.TextNumeric>
          </div>
        ))}
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="flex justify-between mt-3">
        <Text className="text-neutral-600 dark:text-neutral-300">
          VAT (21%)
        </Text>
        <Text.TextNumeric className="text-neutral-600 dark:text-neutral-300">
          {centsToEurosWithCurrency(vat)}
        </Text.TextNumeric>
      </div>
      <div className="flex justify-between font-semibold mt-3">
        <h1>Total</h1>
        <Text.TextNumeric className="text-green-700">
          {centsToEurosWithCurrency(total)}
        </Text.TextNumeric>
      </div>
    </div>
  );
}

export default CheckoutSummary;
