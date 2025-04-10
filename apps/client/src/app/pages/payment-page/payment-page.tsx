import { Text } from '@magnetic/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { validateUpgradePackage } from '../../apis/api-packages';

function PaymentPage() {
  const [searchParams] = useSearchParams();
  const [text, setText] = useState('Nothing here');

  const fetchValidation = useCallback(async (data: any) => {
    setText('We are validating your payment...');
    try {
      const response = await validateUpgradePackage(data);
      console.log('✅ Payment validation response:', response);
    } catch (error) {
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
    <div className="text-center">
      <Text>{text}</Text>
    </div>
  );
}

export default PaymentPage;
