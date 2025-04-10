import { Text } from '@magnetic/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { validateUpgradePackage } from '../../apis/api-packages';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('Nothing here');
  const navigate = useNavigate();

  const fetchValidation = useCallback(async (data: any) => {
    setText('We are validating your payment...');
    try {
      const response = await validateUpgradePackage(data);
      console.log('✅ Payment validated');
      setText('Validated!');
      navigate('/dashboard');
    } catch (error) {
      setText(
        "We couldn't validate your payment. If you believe this is a mistake, please contact our support team for assistance."
      );
      console.error('❌ Error validating payment:', error);
    }
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
