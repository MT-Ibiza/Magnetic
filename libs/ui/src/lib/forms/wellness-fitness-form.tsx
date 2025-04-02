import {
  CurrentUser,
  FormSubmitParams,
  Item,
  WellnessFitnessFormData,
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
  TODAY_DATE,
} from '@magnetic/utils';
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
  const currentSelectItem = item;
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
          dates: formData.date,
          time: formData.time,
          location: formData.location || user?.accommodation,
          comments: formData.comments,
          variantId: formData.variantId,
        }
      : undefined,
  });

  const [total, setTotal] = useState(currentSelectItem?.priceInCents || 0);
  const [amount, setAmount] = useState(formData?.numberOfPeople || 1);
  const [selectedVariantId, setSelectedVariantId] = useState(
    formData.variantId
  );

  const variantOptions =
    currentSelectItem?.variants.map((variant) => {
      return {
        value: variant.id,
        text: `${variant.name}`,
      };
    }) || [];

  const selectedVariant = variantOptions.find((variant) => {
    return variant.value === selectedVariantId;
  });

  const handleFormSubmit = async (data: WellnessFitnessFormData) => {
    console.log(data);
    // onSubmit(data);
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
            {variantOptions.length > 0 && (
              <div className="mb-6">
                <Text className="mb-2">Select Option</Text>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    const value = e.target.value;

                    if (!value) {
                      // Si selecciona la opción predeterminada, usa el precio base del servicio
                      setTotal(currentSelectItem?.priceInCents || 0);
                      setSelectedVariantId(undefined);
                      setValue('variantId', undefined);
                    } else {
                      const variant = currentSelectItem?.variants.find(
                        (v) => v.id === Number(value)
                      );
                      if (variant) {
                        setTotal(variant.priceInCents);
                        setSelectedVariantId(variant.id);
                        setValue('variantId', variant.id);
                      }
                    }
                  }}
                >
                  <option value="">{currentSelectItem?.name}</option>
                  {variantOptions.map((option, index) => (
                    <option value={option.value} key={index}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* <div>
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
              </div> */}
              <div>
                <Text className="mb-2">Date</Text>
                <Input
                  type="date"
                  min={TODAY_DATE}
                  className="w-full"
                  {...register('dates', { required: 'Date is required' })}
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-between w-full">
            <h2 className="text-md lg:text-xl">
              {/* Total:{' '}
              {centsToEurosWithCurrency(
                (currentSelectItem?.priceInCents || 0) * amount
              )} */}
              Total: {centsToEurosWithCurrency(total)}
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
