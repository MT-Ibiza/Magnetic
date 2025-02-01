import { CardWrapper, Checkbox } from '@magnetic/ui';
import React, { useState } from 'react';
import PaymentButton from '../../components/payment-button';

interface Props {
  total: number;
  orderId: number;
}

function CheckoutPayment(props: Props) {
  const { total, orderId } = props;
  const [accepted, setAccepted] = useState(false);

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
      <PaymentButton
        amountInCents={total}
        orderId={orderId}
        disable={!accepted}
      />
    </CardWrapper>
  );
}

export default CheckoutPayment;
