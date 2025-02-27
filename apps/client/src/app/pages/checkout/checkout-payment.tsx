import { CardWrapper, Checkbox, Text } from '@magnetic/ui';
import React, { useState } from 'react';
import PaymentButton from '../../components/payment-button';
import { useCartStore } from '../../hooks/useCartStore';
import { calculateTotalsByService } from '../../utils';
import { DRINKS_MINIMUM } from '../../constants';
import { centsToEurosWithCurrency } from '@magnetic/utils';

function CheckoutPayment() {
  const [accepted, setAccepted] = useState(false);
  const { cart } = useCartStore();
  const services = calculateTotalsByService(cart);

  const total = services.reduce((sum, service) => sum + service.total, 0);
  const drinkService = services.find((s) => s.serviceType === 'drinks');
  const totalDrinks = drinkService?.total || 0;
  const missingAmount = DRINKS_MINIMUM - totalDrinks;
  const hasInsufficientDrinks = drinkService && totalDrinks < DRINKS_MINIMUM;

  const isPayDisabled = !accepted || hasInsufficientDrinks;

  return (
    <div>
      <Checkbox
        name="paymentConfirmed"
        label="By continuing, you confirm your acceptance of the Terms and Conditions."
        defaultChecked={accepted}
        onChange={(checked) => {
          setAccepted(checked);
        }}
        className="mb-3"
      />
      <PaymentButton amountInCents={total} disable={isPayDisabled} />

      {hasInsufficientDrinks && (
        <Text size="1" className="mt-3 text-red-600">
          * You must add {centsToEurosWithCurrency(missingAmount)} more in
          drinks or remove the existing drink items to proceed.
        </Text>
      )}
    </div>
  );
}

export default CheckoutPayment;
