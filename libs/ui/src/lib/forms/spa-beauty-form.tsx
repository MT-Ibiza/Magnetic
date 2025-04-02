import {
  CurrentUser,
  FormSubmitParams,
  Item,
  SpaBeautyFormData,
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
import {
  centsToEurosWithCurrency,
  placeholderItemImage,
} from '@magnetic/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: FormSubmitParams<SpaBeautyFormData>) => void;
  onCancel?: () => void;
  item?: Item;
  user?: CurrentUser;
  formData?: any;
}

export function SpaBeautyBookingForm({
  onSubmit,
  onCancel,
  item,
  user,
  formData,
}: Props) {
  const currentSelectItem = item;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SpaBeautyFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          numberOfPeople: formData.numberOfPeople,
          dates: formData.date,
          time: formData.time,
          location: formData.location || user?.accommodation,
          comments: formData.comments,
        }
      : undefined,
  });

  const [amount, setAmount] = useState(formData?.numberOfPeople || 1);

  const handleFormSubmit = async (data: SpaBeautyFormData) => {
    const formData = { ...data, ...{ numberOfPeople: amount } };
    onSubmit({ form: formData, quantity: amount });
    console.log('a',formData)
  };

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">SPA & Beauty Booking</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10">
            <Text className="mb-2">Number of People</Text>
            <div className="product flex justify-between items-center border border-gray-300 p-4 mb-6 rounded-md">
              <div className="flex gap-3 items-center">
                <img
                  className="w-[35px] bg-gray-50"
                  src={
                    currentSelectItem?.images[0]
                      ? currentSelectItem.images[0].url
                      : placeholderItemImage
                  }
                />
                <Text>{currentSelectItem?.name}</Text>
              </div>
              <div>
                <ItemCounterButtons
                  currentAmount={amount}
                  onClickAdd={() => {
                    setAmount(amount + 1);
                  }}
                  onClickRemove={() => {
                    if (amount > 1) {
                      setAmount(amount - 1);
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Service</Text>
                <Input
                  type="text"
                  className="w-full"
                  disabled
                  defaultValue={currentSelectItem?.name}
                  placeholder="Specify the service (e.g., massage, facial)"
                  {...register('service', { required: 'Service is required' })}
                />
                {errors.service && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.service.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Date(s)</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., 2024-12-20, 2024-12-21"
                  {...register('dates', { required: 'Date(s) are required' })}
                />
                {errors.dates && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.dates.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Time</Text>
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
                <Text className="mb-2">Location</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Your villa address or preferred location"
                  {...register('location', {
                    required: 'Location is required',
                  })}
                />
                {errors.location && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Text className="mb-2">Comments</Text>
              <TextArea
                className="w-full"
                placeholder="Additional comments or specific requests"
                {...register('comments')}
              />
            </div>
            {/* <Checkbox
              name="paymentConfirmed"
              label="I confirm 100% payment of the service at the time of booking."
              className="mt-4"
              defaultChecked={watch('paymentConfirmed')}
              onChange={(checked) => setValue('paymentConfirmed', checked)}
            />
            {errors.paymentConfirmed && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.paymentConfirmed.message}
              </p>
            )} */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-md lg:text-xl">
              Total:{' '}
              {centsToEurosWithCurrency(
                (currentSelectItem?.priceInCents || 0) * amount
              )}
            </h2>
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

export default SpaBeautyBookingForm;
