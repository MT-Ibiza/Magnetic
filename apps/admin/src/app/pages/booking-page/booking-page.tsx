import {
  CardWrapper,
  FormJsonDetails,
  Modal,
  RenderBookingForm,
  StatusBooking,
  Text,
} from '@magnetic/ui';
import { Link, useParams } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import ConfirmAlert from '../../components/confirm-alert';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateBookingStatus } from '../../apis/api-orders';
import { toast } from 'sonner';

export function BookingPage() {
  const params = useParams();
  const bookingId = parseInt(params.id || '');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [openFormModal, setOpenFormModal] = useState(false);

  const toggleAlert = () => {
    setShowAlert((prevState) => !prevState);
  };

  const { isLoading, isError, data, error, refetch } = useBooking(bookingId);

  const updateStatus = useMutation({
    mutationFn: () => {
      return updateBookingStatus(bookingId, {
        status: selectedStatus || 'completed',
        text: '',
      });
    },
    onSuccess: () => {
      toast.success(`Booking updated!`);
      toggleAlert();
      refetch();
    },
    onError: () => {
      toast.success(`Booking couldn't be updated!`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <>
      <CardWrapper className="p-6">
        <div className="header gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-semibold">Booking #{bookingId}</h2>
              <Text className="text-sm text-gray-500 ">
                Client: {data?.user.name}
              </Text>
              <Link to={`/orders/${data?.booking.orderId}`}>
                <Text className="text-sm text-gray-500">
                  Order: #{data?.booking.orderId}
                </Text>
              </Link>
            </div>
            <div>
              <StatusBooking status={data?.booking?.status || ''} />
            </div>
          </div>
          {data && (
            <div className="">
              {data.booking.modificationRequest &&
                data.booking.status === 'modification_requested' && (
                  <div className="flex justify-between items-center border p-5 rounded-md w-full mt-5">
                    <div>
                      <h1 className="font-medium text-sm mb-2">Message</h1>
                      <div className="">
                        <Text>{data.booking.modificationRequest}</Text>
                      </div>
                    </div>
                    <div>
                      <div className="dropdown dropdown-bottom dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="border rounded-md bg-gray-100 p-2"
                        >
                          <Text size="1">Change Status</Text>
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                        >
                          <li
                            onClick={() => {
                              setSelectedStatus('accepted');
                              toggleAlert();
                            }}
                          >
                            <Text size="1">Keep Initial Booking</Text>
                          </li>
                          <li
                            onClick={() => {
                              setOpenFormModal(true);
                            }}
                          >
                            <Text size="1">Edit Booking</Text>
                          </li>
                          <li
                            onClick={() => {
                              setSelectedStatus('cancelled');
                              toggleAlert();
                            }}
                          >
                            <Text size="1" className="text-red-500">
                              Cancel Booking
                            </Text>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              <div className="border p-5 rounded-md w-full mt-5">
                <FormJsonDetails formData={data.booking.formData} />
              </div>
            </div>
          )}
        </div>
      </CardWrapper>
      <ConfirmAlert
        title="Change Status"
        message={`Are you sure you want to change status booking`}
        show={showAlert}
        onClickConfirm={async () => {
          await updateStatus.mutateAsync();
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
      <Modal open={openFormModal}>
        {data ? (
          <RenderBookingForm
            type={data.booking.type}
            formData={data.booking.formData}
            onSubmit={(data) => {
              setSelectedStatus('completed');
              toggleAlert();
              // handleEditForm(data.form);
            }}
            onClose={() => {
              setOpenFormModal(false);
            }}
          />
        ) : (
          <h1>Nothing</h1>
        )}
      </Modal>
    </>
  );
}

export default BookingPage;
