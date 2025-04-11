import { useState } from 'react';
import { URL_REQUEST_PAYMENT } from '../apis/api-constants';
import { Button, Modal } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../apis/api-order';
import { GuestUser, Order } from '@magnetic/interfaces';
import FormGuestUser from './form-guest-user';
import { useLocation } from 'react-router-dom';

export function PaymentButton(props: {
  amountInCents: number;
  disable?: boolean;
  guestMode?: boolean;
}) {
  const { amountInCents, disable, guestMode } = props;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const createOrderMutation = useMutation({
    mutationFn: (params: any) => createOrder(params),
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
          urlOk: guestMode
            ? `${window.location.origin}/${section}/payment`
            : `${window.location.origin}/payment?redirect=bookings`,
          urlKo: guestMode
            ? `${window.location.origin}/${section}/payment`
            : `${window.location.origin}/payment`,
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
    if (guestMode) {
      toggleModal();
    } else {
      await createOrderAndPay();
    }
  }

  async function createOrderAndPay(guestUser?: GuestUser) {
    //@ts-ignore
    document.getElementById('processing-order-modal').showModal();
    await createOrderMutation.mutateAsync(guestUser);
  }

  return (
    <>
      <Button
        size={2}
        radius="full"
        onClick={payOrRequestInformation}
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
        </div>
      </dialog>

      <Modal open={openModal}>
        <FormGuestUser
          onCancel={toggleModal}
          onSave={async (data) => {
            await createOrderAndPay(data);
          }}
        />
      </Modal>
    </>
  );
}

export default PaymentButton;
