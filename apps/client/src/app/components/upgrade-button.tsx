import { useState } from 'react';
import { URL_REQUEST_PAYMENT } from '../apis/api-constants';
import { Button } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { Order } from '@magnetic/interfaces';
import { upgradePackage } from '../apis/api-packages';

export function UpgradeButton(props: {
  amountInCents: number;
  packageId: number;
}) {
  const { amountInCents, packageId } = props;
  const [loading, setLoading] = useState(false);

  const createOrderMutation = useMutation({
    mutationFn: () => upgradePackage(packageId),
    onSuccess: (order: Order) => {
      handlePayment(order.id);
    },
  });

  const handlePayment = async (orderId: number) => {
    setLoading(true);
    try {
      const response = await fetch(URL_REQUEST_PAYMENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInCents,
          orderId: `${orderId}`,
          urlOk: `${window.location.origin}/payment`,
          urlKo: `${window.location.origin}/payment`,
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

  async function payOrRequestInformation() {
    await createOrderAndPay();
  }

  async function createOrderAndPay() {
    //@ts-ignore
    document.getElementById('processing-order-modal').showModal();
    await createOrderMutation.mutateAsync();
  }

  return (
    <>
      <Button
        className="w-full"
        onClick={payOrRequestInformation}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Upgrade Now'}
      </Button>

      <dialog id="processing-order-modal" className="modal">
        <div className="modal-box text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <h3 className="text-lg font-bold">Processing Your Order</h3>
          <p className="py-4">
            Please do not refresh or leave this page. You will be redirected to
            the payment page shortly.
          </p>
        </div>
      </dialog>
    </>
  );
}

export default UpgradeButton;
