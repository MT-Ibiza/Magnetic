import { Checkbox, Text } from '@magnetic/ui';
import { useState } from 'react';
import PaymentButton from '../../components/payment-button';
import { DRINKS_MINIMUM } from '../../constants';
import { centsToEurosWithCurrency, ServiceTotal } from '@magnetic/utils';

interface Props {
  servicesSummary: ServiceTotal[];
  total: number;
}

function CheckoutPayment(props: Props) {
  const { servicesSummary: services, total: totalServices } = props;
  const [accepted, setAccepted] = useState(false);
  const drinkService = services.find((s) => s.serviceType === 'drinks');
  const totalDrinks = drinkService?.total || 0;
  const missingAmount = DRINKS_MINIMUM - totalDrinks;
  const hasInsufficientDrinks = drinkService && totalDrinks < DRINKS_MINIMUM;
  const isPayDisabled = !accepted || hasInsufficientDrinks;

  const fee = totalServices * 0.02;
  const total = totalServices + fee;
  console.log('total: ', total);

  return (
    <div>
      <Checkbox
        name="paymentConfirmed"
        url="/terms-conditions"
        underline={true}
        text="By continuing, you confirm your acceptance of the"
        label="Terms and Conditions."
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
