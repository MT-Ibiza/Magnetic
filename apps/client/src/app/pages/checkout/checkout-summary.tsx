import { Text } from '@magnetic/ui';
import {
  centsFixed,
  centsToEurosWithCurrency,
  ServiceTotal,
} from '@magnetic/utils';

interface Props {
  servicesSummary: ServiceTotal[];
  total: number;
}

function CheckoutSummary(props: Props) {
  const { servicesSummary: services, total: totalServices } = props;

  const vat = totalServices - totalServices / 1.21;
  const vatFixed = centsFixed(vat);
  const fee = totalServices * 0.02;
  const total = totalServices + fee;

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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Text className="text-neutral-600 dark:text-neutral-300">
            Includes VAT (21%)
          </Text>
          <Text.TextNumeric className="text-neutral-600 dark:text-neutral-300">
            {centsToEurosWithCurrency(vatFixed)}
          </Text.TextNumeric>
        </div>
        <div className="flex justify-between">
          <Text className="text-neutral-600 dark:text-neutral-300">
            Service Fee (2%)
          </Text>
          <Text.TextNumeric className="text-neutral-600 dark:text-neutral-300">
            {centsToEurosWithCurrency(fee)}
          </Text.TextNumeric>
        </div>
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
