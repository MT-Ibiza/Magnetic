import {
  CurrentUser,
  FormSubmitParams,
  Item,
  ReservationsFormData,
} from '@magnetic/interfaces';
import {
  Button,
  Checkbox,
  Input,
  ItemCounterButtons,
  Modal,
  Text,
  TextArea,
} from '@magnetic/ui';
import { centsToEurosWithCurrency, TODAY_DATE } from '@magnetic/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: FormSubmitParams<ReservationsFormData>) => void;
  onCancel?: () => void;
  item?: Item;
  user?: CurrentUser;
  formData?: any;
}

export function ReservationsRestaurantBookingForm({
  onSubmit,
  formData,
  onCancel,
  user,
  item,
}: Props) {
  const currentSelectItem = item;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReservationsFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          clientName: user?.name || formData.clientName,
          numberOfPeople: formData.numberOfPeople,
          childrenAges: formData.childrenAges,
          date: formData.date,
          time: formData.time,
          comments: formData.comments,
          venue: formData.venue,
          beachReservations: formData.beachReservations
        }
      : undefined,
  });

  const [amount, setAmount] = useState(formData?.numberOfPeople || 1);

  const handleFormSubmit = async (data: ReservationsFormData) => {
    const formData = { ...data };
    onSubmit({ form: formData });
    console.log('a', formData);
  };

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Restaurant Reservation</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Venue</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Enter the name of the restaurant"
                  {...register('venue', {
                    required: 'Venue is required',
                  })}
                />
                {errors.venue && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.venue.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Name</Text>
                <Input
                  type="text"
                  // disabled
                  className="w-full"
                  defaultValue={user?.name}
                  placeholder="Enter the name of the restaurant"
                  {...register('clientName', {
                    required: 'Name is required',
                  })}
                />
              </div>
              <div>
                <Text className="mb-2">Service</Text>
                <Input
                  type="text"
                  className="w-full"
                  disabled
                  defaultValue={currentSelectItem?.name}
                  placeholder="Specify the service"
                  {...register('service', { required: 'Service is required' })}
                />
                {errors.service && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Date</Text>
                <Input
                  type="date"
                  className="w-full"
                  min={TODAY_DATE}
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.date.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Preferred Time</Text>
                <Input
                  type="time"
                  className="w-full"
                  {...register('time', { required: 'Time is required' })}
                />
                {errors.time && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.time.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Number of People</Text>
                <Input
                  type="number"
                  min="1"
                  className="w-full"
                  {...register('numberOfPeople', {
                    required: 'Number of people is required',
                    valueAsNumber: true,
                  })}
                />
                {errors.numberOfPeople && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.numberOfPeople.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Children & Ages</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., 2 kids, ages 5 and 8"
                  {...register('childrenAges', {
                    required: 'Kids and ages are required',
                  })}
                />
                {errors.childrenAges && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.childrenAges.message}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <Text className="mb-2">Comments</Text>
              <TextArea
                className="w-full"
                placeholder="Additional comments or specific requests"
                {...register('comments')}
              />
            </div>
            <div className="">
              <Text className="mb-2">Beach Reservations (if applicable)</Text>
              <TextArea
                className="w-full"
                placeholder="Amount of beds required & arrival time"
                {...register('beachReservations')}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-end w-full">
            {/* <h2 className="text-md lg:text-xl">
              Total:{' '}
              {centsToEurosWithCurrency(
                (currentSelectItem?.priceInCents || 0) * amount
              )}
            </h2> */}
            <div className="flex gap-3">
              {onCancel && (
                <Button
                  radius="full"
                  className=""
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button radius="full" type="submit">
                Book Service
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default ReservationsRestaurantBookingForm;
