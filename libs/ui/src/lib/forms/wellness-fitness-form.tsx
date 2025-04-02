import {
  CurrentUser,
  FormSubmitParams,
  Item,
  WellnessFitnessFormData,
} from '@magnetic/interfaces';
import { Button, Input, Modal, Text, TextArea } from '@magnetic/ui';
import { centsToEurosWithCurrency, TODAY_DATE } from '@magnetic/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onSubmit: (data: FormSubmitParams<WellnessFitnessFormData>) => void;
  onCancel?: () => void;
  item?: Item;
  user?: CurrentUser;
  formData?: any;
}

export function WellnessFitnessBookingForm({
  onSubmit,
  item,
  user,
  formData,
  onCancel,
}: Props) {
  const currentSelectItem = item as Item;
  const variantOptions =
    currentSelectItem?.variants.map((variant) => {
      return {
        value: `${variant.id}`,
        text: `${currentSelectItem.name} - ${variant.name}`,
      };
    }) || [];

  const allOptions = variantOptions;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WellnessFitnessFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          numberOfPeople: formData.numberOfPeople,
          date: formData.date,
          time: formData.time,
          location: formData.location || user?.accommodation,
          comments: formData.comments,
          variantId: formData.variantId,
        }
      : undefined,
  });

  const variantSelected = formData?.variantId
    ? currentSelectItem.variants.find((variant) => {
        return variant.id === formData?.variantId;
      })
    : undefined;
  const itemPrice = variantSelected
    ? variantSelected.priceInCents
    : currentSelectItem.priceInCents;
  const [price, setPrice] = useState(itemPrice);
  const handleFormSubmit = async (data: WellnessFitnessFormData) => {
    const formData = data;
    onSubmit({ form: formData, variantId: data.variantId });
  };

  return (
    <div>
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Wellness & Fitness Booking</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10">
            <div className="mb-6">
              {variantOptions.length > 0 && (
                <div className="">
                  <Text className="mb-2">Number of People</Text>
                  <select
                    {...register('variantId', {
                      required: 'Number of People is required',
                      valueAsNumber: true,
                    })}
                    className="select select-bordered w-full"
                    value={watch('variantId')}
                    onChange={(e) => {
                      const value = e.target.value;
                      const variant = currentSelectItem.variants.find(
                        (v) => v.id === Number(value)
                      );
                      if (variant) {
                        setPrice(variant.priceInCents);
                        setValue('variantId', variant.id);
                      } else {
                        setValue('variantId', undefined);
                        setPrice(currentSelectItem.priceInCents);
                      }
                    }}
                  >
                    {allOptions.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              )}
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
                <Text className="mb-2">Date</Text>
                <Input
                  type="date"
                  min={TODAY_DATE}
                  className="w-full"
                  {...register('date', { required: 'Date is required' })}
                />
                {errors.date && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.date.message}
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-md lg:text-xl">
              Total: {centsToEurosWithCurrency(price)}
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

export default WellnessFitnessBookingForm;
