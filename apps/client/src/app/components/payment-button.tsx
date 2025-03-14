import React, { useState } from 'react';
import { URL_REQUEST_PAYMENT } from '../apis/api-constants';
import { Button } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../apis/api-order';
import { Order } from '@magnetic/interfaces';

export function PaymentButton(props: {
  amountInCents: number;
  disable?: boolean;
}) {
  const { amountInCents, disable } = props;
  const [loading, setLoading] = useState(false);

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder([]),
    onSuccess: (order: Order) => {
      // clearCart();
      handlePayment(order.id);
      // setCreatedOrderId(order.id);
      //@ts-ignore
      // document.getElementById('processing-order-modal').close();
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
          urlOk: `${window.location.origin}/bookings`, // URL en caso de éxito
          urlKo: `${window.location.origin}/checkout/failure`, // URL en caso de error
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

  async function createOrderAndPay() {
    //@ts-ignore
    document.getElementById('processing-order-modal').showModal();
    await createOrderMutation.mutateAsync();
  }

  return (
    <>
      <Button
        size={2}
        radius="full"
        onClick={createOrderAndPay}
        disabled={loading || disable}
        className="text-[17px] leading-[24px] p-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
      >
        {loading ? 'Processing...' : 'Confirm & Pay'}
      </Button>

      <dialog id="processing-order-modal" className="modal">
        <div className="modal-box text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <h3 className="text-lg font-bold">Processing Your Order</h3>
          <p className="py-4">
            Please do not refresh or leave this page. You will be redirected to
            the payment page shortly.
          </p>
          {/* <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <Link to={`/services`}>
                  <Button className="" variant="outline" color="neutral">
                    Check other services
                  </Button>
                </Link>
                <Link to={`/orders/${createdOrderId}`}>
                  <Button className="">View Order</Button>
                </Link>
              </div>
            </form>
          </div> */}
        </div>
      </dialog>
    </>
  );
}

export default PaymentButton;
function clearCart() {
  throw new Error('Function not implemented.');
}
