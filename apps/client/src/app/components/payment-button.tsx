import React, { useState } from 'react';
import { URL_REQUEST_PAYMENT } from '../apis/api-constants';

const PaymentButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch(URL_REQUEST_PAYMENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1000, // Monto en céntimos (10.00€)
          orderId: 'ORDER123', // Identificador único del pedido
          urlOk: `${window.location.origin}/success`, // URL en caso de éxito
          urlKo: `${window.location.origin}/failure`, // URL en caso de error
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.redsysUrl && data.merchantParams && data.signature) {
        // Crear un formulario dinámicamente
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.redsysUrl;

        // Input para Ds_SignatureVersion
        const signatureVersionInput = document.createElement('input');
        signatureVersionInput.type = 'hidden';
        signatureVersionInput.name = 'Ds_SignatureVersion';
        signatureVersionInput.value = 'HMAC_SHA256_V1';

        // Input para Ds_MerchantParameters
        const merchantParamsInput = document.createElement('input');
        merchantParamsInput.type = 'hidden';
        merchantParamsInput.name = 'Ds_MerchantParameters';
        merchantParamsInput.value = data.merchantParams;

        // Input para Ds_Signature
        const signatureInput = document.createElement('input');
        signatureInput.type = 'hidden';
        signatureInput.name = 'Ds_Signature';
        signatureInput.value = data.signature;

        // Añadir inputs al formulario
        form.appendChild(signatureVersionInput);
        form.appendChild(merchantParamsInput);
        form.appendChild(signatureInput);

        // Añadir formulario al DOM y enviarlo
        document.body.appendChild(form);
        form.submit();
      } else {
        alert('Error al iniciar el pago. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      alert('Se produjo un error al procesar el pago. Revise los datos.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="p-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
    >
      {loading ? 'Cargando...' : 'Pagar'}
    </button>
  );
};

export default PaymentButton;
