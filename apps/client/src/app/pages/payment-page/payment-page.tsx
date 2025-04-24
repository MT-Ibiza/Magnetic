import { Text } from '@magnetic/ui';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validatePayment } from '../../apis/api-payment';
import {
  SLUG_PUBLIC_BOATS,
  SLUG_PUBLIC_ORDER_DRINKS,
  SLUG_PUBLIC_SHOP_DRINKS,
} from '../../constants';
import { useMutation } from '@tanstack/react-query';
import { GoCheckCircleFill, GoXCircleFill } from 'react-icons/go';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>();
  const redirect = searchParams.get('redirect');
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderId');
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];
  const publics = [
    SLUG_PUBLIC_BOATS,
    SLUG_PUBLIC_SHOP_DRINKS,
    SLUG_PUBLIC_ORDER_DRINKS,
  ];
  const urlRedirect = redirect
    ? redirect
    : publics.includes(section)
    ? section
    : `/dashboard`;

  const validateMutation = useMutation<any, Error, any>({
    mutationFn: (data) => {
      setIsLoading(true);
      return validatePayment(data);
    },
    onSuccess: () => {
      setIsLoading(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        window.location.href = urlRedirect;
        console.log('✅ Payment validated');
      }, 500);
    },
    onError: (error) => {
      setTimeout(() => {
        setIsLoading(false);
        setPaymentSuccess(false);
        console.error('❌ Error validating payment:', error);
      }, 500);
    },
  });

  const fetchValidation = useCallback(async (data: any) => {
    await validateMutation.mutateAsync(data);
  }, []);

  useEffect(() => {
    if (orderId && status) {
      fetchValidation({status, orderId});
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-3 w-full p-10">
      {!isLoading && (
        <>
          {paymentSuccess === true && (
            <div className="flex flex-col gap-3 items-center">
              <GoCheckCircleFill size={40} color="#15803d" />
              <h3 className="font-semibold">Payment Success</h3>
              <Text>Thanks for your payment!</Text>
            </div>
          )}
          {paymentSuccess === false && (
            <div className="flex flex-col gap-3 items-center">
              <GoXCircleFill size={40} color="#ef4444" />
              <h3 className="font-semibold">Payment Failed</h3>
              <Text>
                If you believe this is a mistake, please contact our support
                team for assistance.
              </Text>
            </div>
          )}
        </>
      )}
      {isLoading && (
        <div className="flex flex-col gap-3 items-center">
          <span className="loading loading-spinner loading-lg"></span>
          <Text className="max-w-lg text-center">
            We are checking your payment...
          </Text>
        </div>
      )}
    </div>
  );
}

export default PaymentPage;
