import { Text } from '@magnetic/ui';
import { centsToEurosWithCurrency, ServiceTotal } from '@magnetic/utils';

interface Props {
  servicesSummary: ServiceTotal[];
  total: number;
}

function CheckoutSummary(props: Props) {
  const { servicesSummary: services, total: totalServices } = props;

  const subtotal = totalServices;
  const vat = subtotal * 0.21;
  const fee = (subtotal + vat) * 0.02;
  const total = subtotal + vat + fee;

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold mb-3">Order Summary</h3>
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
      <div className="flex justify-between mt-3">
        <Text className="text-neutral-600 dark:text-neutral-300">Fee (2%)</Text>
        <Text.TextNumeric className="text-neutral-600 dark:text-neutral-300">
          {centsToEurosWithCurrency(fee)}
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
