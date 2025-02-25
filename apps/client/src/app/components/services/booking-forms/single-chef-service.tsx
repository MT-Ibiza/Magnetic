import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useApp } from '../../../hooks/useApp';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { placeholderItemImage } from '../../../constants';
import ItemCounterButtons from '../../items/item-counter-buttons';
import { useState } from 'react';

interface SingleChefServiceFormData {
  date: string;
  startTime: string;
  numberOfPeople: number;
  kidsAges: string;
  location: string;
  dietaryComments: string;
}

interface Props {
  onSubmit: (data: SingleChefServiceFormData, quantity: number) => void;
  formData?: any;
  onCancel?: () => void;
}

export function SingleChefServiceForm({ onSubmit, formData, onCancel }: Props) {
  const { getCurrentUser } = useAuth();
  const { currentSelectItem } = useApp();
  const user = getCurrentUser();
  const [amount, setAmount] = useState(formData?.numberOfPeople || 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingleChefServiceFormData>({
    defaultValues: formData
      ? {
          date: formData.date,
          startTime: formData.startTime,
          numberOfPeople: formData.numberOfPeople || amount,
          kidsAges: formData.kidsAges,
          location: formData.location || user?.accommodation,
          dietaryComments: formData.dietaryComments,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: SingleChefServiceFormData) => {
    const formData = { ...data, ...{ numberOfPeople: amount } };
    onSubmit(formData, amount);
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Single Chef Service</h2>
        <h2 className="font-bold">
          Total:{' '}
          {centsToEurosWithCurrency(
            (currentSelectItem?.priceInCents || 0) * amount
          )}
        </h2>
      </div>
      <Text className="mb-2">Select Quantity</Text>
      <div className="product flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-md">
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
              if (amount >= 1) {
                setAmount(amount - 1);
              }
            }}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Date</Text>
            <Input
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
            <Text className="mb-2">Start Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('startTime', { required: 'Start time is required' })}
            />
            {errors.startTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Kids and Ages</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="e.g., 2 kids, ages 5 and 8"
              {...register('kidsAges', {
                required: 'Kids and ages are required',
              })}
            />
            {errors.kidsAges && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.kidsAges.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Location (Your Villa)</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Your villa address"
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Text className="mb-2">Preferences and Dietary Comments</Text>
          <TextArea
            className="w-full"
            placeholder="Any dietary preferences or special comments"
            {...register('dietaryComments', {
              required: 'Dietary comments are required',
            })}
          />
          {errors.dietaryComments && (
            <p className="text-[12px] text-red-500 pt-2">
              {errors.dietaryComments.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
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
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default SingleChefServiceForm;
