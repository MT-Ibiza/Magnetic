import { Button, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useApp } from '../../../hooks/useApp';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useState } from 'react';
import Modal from '../../modal';
import { FormSubmitParams } from '@magnetic/interfaces';

export interface TransferFormData {
  date: string;
  time: string;
  pickUpLocation: string;
  dropOffLocation: string;
  numberOfPeople: number;
  contactName: string;
  contactNumber: string;
  flightNumber: string;
  luggageAmount: number;
  childSeats: string;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: FormSubmitParams<TransferFormData>) => void;
  formData?: any;
  viewCol?: boolean;
  onCancel?: () => void;
}

export function TransferBookingForm({
  onSubmit,
  formData,
  viewCol,
  onCancel,
}: Props) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const { currentSelectItem } = useApp();
  const [total, setTotal] = useState(currentSelectItem?.priceInCents || 0);
  const [selectedVariantId, setSelectedVariantId] = useState<number>();

  const variantOptions =
    currentSelectItem?.variants.map((variant) => {
      return {
        value: variant.id,
        text: `${currentSelectItem.name} - ${variant.name}`,
      };
    }) || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TransferFormData>({
    defaultValues: formData
      ? {
          date: formData.date,
          time: formData.time,
          pickUpLocation: formData.pickUpLocation,
          dropOffLocation: formData.dropOffLocation,
          numberOfPeople: formData.numberOfPeople,
          contactName: formData.contactName || user?.name,
          contactNumber: formData.contactNumber || user?.phone,
          flightNumber: formData.flightNumber,
          luggageAmount: formData.luggageAmount,
          childSeats: formData.childSeats || '',
        }
      : {
          contactName: user?.name,
          contactNumber: user?.phone,
        },
  });

  const handleFormSubmit = async (data: TransferFormData) => {
    onSubmit({
      form: data,
      variantId: selectedVariantId,
    });
  };

  const viewClasses = 'grid grid-cols-1 md:grid-cols-2 gap-6';

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Transfer Booking</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="">
        <Modal.Body>
          <div className={`p-10`}>
            {variantOptions.length > 0 && (
              <div className="mb-6">
                <Text className="mb-2">Select option</Text>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    const value = e.target.value;
                    const variant = currentSelectItem?.variants.find(
                      (v) => v.id === Number(value)
                    );
                    if (variant) {
                      setSelectedVariantId(variant.id);
                      setTotal(variant.priceInCents);
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
            <div className={`${viewClasses}`}>
              <div>
                <Text className="mb-2">Date</Text>
                <Input
                  min={new Date().toISOString().split('T')[0]}
                  type="date"
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
                <Text className="mb-2">Pick Up Location</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., Airport, Hotel"
                  {...register('pickUpLocation', {
                    required: 'Pick up location is required',
                  })}
                />
                {errors.pickUpLocation && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.pickUpLocation.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Drop Off Location</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., Villa, Hotel"
                  {...register('dropOffLocation', {
                    required: 'Drop off location is required',
                  })}
                />
                {errors.dropOffLocation && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.dropOffLocation.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Number of people</Text>
                <Input
                  type="number"
                  min="1"
                  max={20}
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
                <Text className="mb-2">Child Seats</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Enter number or type of child seats"
                  {...register('childSeats')}
                />
              </div>
              <div>
                <Text className="mb-2">Contact Name</Text>
                <Input
                  type="text"
                  className="w-full"
                  {...register('contactName', {
                    required: 'Contact name is required',
                  })}
                />
                {errors.contactName && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.contactName.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Contact Number</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., +1234567890"
                  {...register('contactNumber', {
                    required: 'Contact number is required',
                  })}
                />
                {errors.contactNumber && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Text className="mb-2">Flight Number</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Optional"
                  {...register('flightNumber')}
                />
              </div>
              <div>
                <Text className="mb-2">Luggage Amount</Text>
                <Input
                  type="number"
                  min="0"
                  className="w-full"
                  {...register('luggageAmount', { valueAsNumber: true })}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between gap-3 w-full">
            <h2 className="text-xl">
              Total: {centsToEurosWithCurrency(total)}
            </h2>
            <div className="flex gap-3">
              {onCancel && (
                <Button
                  className=""
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">Book Transfer</Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default TransferBookingForm;
