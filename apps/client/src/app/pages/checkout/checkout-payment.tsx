import { Checkbox, Text } from '@magnetic/ui';
import { useEffect, useState } from 'react';
import PaymentButton from '../../components/payment-button';
import { DRINKS_MINIMUM } from '../../constants';
import {
  centsToEurosWithCurrency,
  ServiceTotal,
  userCanMakeBooking,
} from '@magnetic/utils';
import { getCurrentClient } from '../../apis/api-client';
import OrderButton from '../../components/order-button';

interface Props {
  servicesSummary: ServiceTotal[];
  total: number;
  guestMode?: boolean;
  skipPayment?: boolean;
}

function CheckoutPayment(props: Props) {
  const {
    servicesSummary: services,
    total: totalServices,
    guestMode,
    skipPayment,
  } = props;
  const [isOutDated, setIsOutDated] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const drinkService = services.find((s) => s.serviceType === 'drinks');
  const totalDrinks = drinkService?.total || 0;
  const missingAmount = DRINKS_MINIMUM - totalDrinks;
  const hasInsufficientDrinks = drinkService && totalDrinks < DRINKS_MINIMUM;
  const isPayDisabled = !accepted || hasInsufficientDrinks || isOutDated;

  const fee = totalServices * 0.02;
  const total = totalServices + fee;

  async function checkIfCanBook() {
    try {
      const user = await getCurrentClient();
      const isValid = userCanMakeBooking(user.arrivalDate);
      setIsOutDated(!isValid);
    } catch (error) {
      setIsOutDated(true);
    }
  }

  useEffect(() => {
    if (!guestMode) {
      checkIfCanBook();
    }
  }, []);

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
      {skipPayment ? (
        <OrderButton
          amountInCents={total}
          disable={isPayDisabled}
          guestMode={guestMode}
        />
      ) : (
        <PaymentButton
          amountInCents={total}
          disable={isPayDisabled}
          guestMode={guestMode}
        />
      )}
      {hasInsufficientDrinks && (
        <Text size="1" className="mt-3 text-red-600">
          * You must add {centsToEurosWithCurrency(missingAmount)} more in
          drinks or remove the existing drink items to proceed.
        </Text>
      )}
      {isOutDated && (
        <Text size="1" className="mt-3 text-red-600">
          * Online bookings are not available within 7 days of arrival. Contact
          us for assistance or further enquiries.
        </Text>
      )}
    </div>
  );
}

export default CheckoutPayment;
