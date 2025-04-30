import { useState } from 'react';
import { Button, Modal } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../apis/api-order';
import { GuestUser, Order } from '@magnetic/interfaces';
import FormGuestUser from './form-guest-user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGuestCartStore } from '../hooks/useGuestCartStore';
import OrderCreated from './order-created';

export function OrderButton(props: {
  amountInCents: number;
  disable?: boolean;
  guestMode?: boolean;
}) {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];
  const { clearCart } = useGuestCartStore();
  const { amountInCents, disable, guestMode } = props;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [successOrder, setSuccessOrder] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const createOrderMutation = useMutation({
    mutationFn: (params: any) =>
      createOrder({ ...params, ...{ sendEmail: true } }),
    onSuccess: (order: Order) => {
      if (guestMode) {
        setSuccessOrder(true);
        //@ts-ignore
        document.getElementById('processing-order-modal').close();
        setTimeout(() => {
          setLoading(false);
          window.location.href = `/${section}`;
        }, 1200);
      } else {
        setLoading(false);
        window.location.href = '/bookings';
      }
    },
  });

  async function payOrRequestInformation() {
    if (guestMode) {
      toggleModal();
    } else {
      await createOrderAndPay();
    }
  }

  async function createOrderAndPay(params?: GuestUser) {
    //@ts-ignore
    document.getElementById('processing-order-modal').showModal();
    await createOrderMutation.mutateAsync(params);
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
        {loading ? 'Processing...' : 'Create Order'}
      </Button>

      <dialog id="processing-order-modal" className="modal">
        <div className="modal-box text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <h3 className="text-lg font-bold">Processing Your Order</h3>
          <p className="py-4">Please do not refresh or leave this page</p>
        </div>
      </dialog>

      <Modal open={openModal}>
        {successOrder ? (
          <OrderCreated onCancel={toggleModal} />
        ) : (
          <FormGuestUser
            buttonText="Order Now"
            onCancel={toggleModal}
            onSave={async (userData) => {
              await createOrderAndPay(userData);
            }}
          />
        )}
      </Modal>
    </>
  );
}

export default OrderButton;
