import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useApp } from '../../../hooks/useApp';
import Modal from '../../modal';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FormSubmitParams } from '@magnetic/interfaces';
import { TODAY_DATE } from '../../../constants';
import ItemCounterButtons from '../../items/item-counter-buttons';
import { useState } from 'react';

export interface WeeklyChefServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  numberOfWeeks: number;
  childrenAges: string;
  location: string;
  dietaryComments: string;
  shoppingListRequests: string;
  firstMealRequests: string;
}

interface Props {
  onSubmit: (data: FormSubmitParams<WeeklyChefServiceFormData>) => void;
  formData?: any;
  onCancel?: () => void;
}

export function WeeklyChefServiceForm({ onSubmit, formData, onCancel }: Props) {
  const { getCurrentUser } = useAuth();
  const { currentSelectItem } = useApp();
  const user = getCurrentUser();
  const [amount, setAmount] = useState(formData?.numberOfWeeks || 1);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<WeeklyChefServiceFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          date: formData.date,
          startTime: formData.startTime,
          numberOfWeeks: formData.numberOfWeeks,
          numberOfPeople: formData.numberOfPeople,
          childrenAges: formData.childrenAges,
          location: formData.location || user?.accommodation,
          dietaryComments: formData.dietaryComments,
          shoppingListRequests: formData.shoppingListRequests,
          firstMealRequests: formData.firstMealRequests,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: WeeklyChefServiceFormData) => {
    onSubmit({ form: data, quantity: amount });
  };

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">Weekly Chef</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10 flex flex-col gap-6">
            <div>
              <div className="product flex justify-between items-center border border-gray-300 p-4 mb-3 rounded-md">
                <div className="flex gap-3 items-center">
                  <Text>Number of Weeks</Text>
                </div>
                <div>
                  <ItemCounterButtons
                    currentAmount={amount}
                    onClickAdd={() => {
                      const newAmount = amount + 1;
                      setAmount(newAmount);
                      setValue('numberOfWeeks', newAmount);
                    }}
                    onClickRemove={() => {
                      if (amount > 1) {
                        const newAmount = amount - 1;
                        setAmount(newAmount);
                        setValue('numberOfWeeks', newAmount);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Service</Text>
                <Input
                  disabled
                  type="text"
                  className="w-full"
                  defaultValue={currentSelectItem?.name}
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
                <Text className="mb-2">Start Time</Text>
                <Input
                  type="time"
                  className="w-full"
                  {...register('startTime', {
                    required: 'Start time is required',
                  })}
                />
                {errors.startTime && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.startTime.message}
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
              <div>
                <Text className="mb-2">Location</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Your villa address"
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
            <div>
              <Text className="mb-2">Preferences & Dietary Requirements</Text>
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
            <div>
              <Text className="mb-2">Shopping List</Text>
              <TextArea
                className="w-full"
                placeholder="Any grocery requests for arrival"
                {...register('shoppingListRequests')}
              />
            </div>
            <div>
              <Text className="mb-2">First Meal</Text>
              <TextArea
                className="w-full"
                placeholder="Requirements for first dinner and breakfast"
                {...register('firstMealRequests')}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between gap-3 w-full">
            <h2 className="text-xl">
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

export default WeeklyChefServiceForm;
