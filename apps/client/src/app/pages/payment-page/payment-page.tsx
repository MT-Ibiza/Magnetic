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

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('');
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];
  const publics = [
    SLUG_PUBLIC_BOATS,
    SLUG_PUBLIC_SHOP_DRINKS,
    SLUG_PUBLIC_ORDER_DRINKS,
  ];
  const urlRedirect = publics.includes(section) ? section : `/dashboard`;

  const validateMutation = useMutation<any, Error, any>({
    mutationFn: (data) => {
      setText('We are validating your payment...');
      return validatePayment(data);
    },
    onSuccess: () => {
      console.log('✅ Payment validated');
      setText('Validated!');
      window.location.href = urlRedirect;
    },
    onError: (error) => {
      setText(
        "We couldn't validate your payment. If you believe this is a mistake, please contact our support team for assistance."
      );
      console.error('❌ Error validating payment:', error);
    },
  });

  const fetchValidation = useCallback(async (data: any) => {
    await validateMutation.mutateAsync(data);
  }, []);

  useEffect(() => {
    const signature = searchParams.get('Ds_Signature');
    const merchantParams = searchParams.get('Ds_MerchantParameters');
    const version = searchParams.get('Ds_SignatureVersion');

    if (signature && merchantParams && version) {
      const payload = {
        signature,
        merchantParams,
        version,
      };
      fetchValidation(payload);
    }
  }, []);

  return (
    <div className="flex justify-center w-full p-10">
      <Text className="max-w-lg">{text}</Text>
    </div>
  );
}

export default PaymentPage;
