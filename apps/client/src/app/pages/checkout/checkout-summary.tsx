import { CardWrapper, Text } from '@magnetic/ui';
import React from 'react';
import { useCartStore } from '../../hooks/useCartStore';
import { calculateTotalsByService } from '../../utils';
import { centsToEurosWithCurrency } from '@magnetic/utils';

interface Props {}

function CheckoutSummary(props: Props) {
  const {} = props;
  const { cart } = useCartStore();
  const services = calculateTotalsByService(cart);

  const total = services.reduce((a, b) => {
    return b.total + a;
  }, 0);

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-2xl font-semibold mb-3">Summary order</h3>
      <div className="flex flex-col gap-2">
        {services.map((service, index) => (
          <div key={index} className="flex justify-between">
            <Text className='text-neutral-6000 dark:text-neutral-300' size="2">{service.service}</Text>
            <Text.TextNumeric className='text-neutral-6000 dark:text-neutral-300'>
              {centsToEurosWithCurrency(service.total)}
            </Text.TextNumeric>
          </div>
        ))}
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
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
