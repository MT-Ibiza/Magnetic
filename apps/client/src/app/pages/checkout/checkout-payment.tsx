import { CardWrapper, Checkbox } from '@magnetic/ui';
import React, { useState } from 'react';
import PaymentButton from '../../components/payment-button';
import { useCartStore } from '../../hooks/useCartStore';
import { calculateTotalsByService } from '../../utils';

interface Props {}

function CheckoutPayment(props: Props) {
  const [accepted, setAccepted] = useState(false);
  const { cart } = useCartStore();
  const services = calculateTotalsByService(cart);

  const total = services.reduce((a, b) => {
    return b.total + a;
  }, 0);

  return (
    <CardWrapper>
      <Checkbox
        name="paymentConfirmed"
        label="By continuing, you confirm your acceptance of the Terms and Conditions."
        defaultChecked={accepted}
        onChange={(checked) => {
          setAccepted(checked);
        }}
        className="mb-3"
      />
      <PaymentButton amountInCents={total} disable={!accepted} />
    </CardWrapper>
  );
}

export default CheckoutPayment;
