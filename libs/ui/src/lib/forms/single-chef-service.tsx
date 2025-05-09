import {
  Button,
  Input,
  ItemCounterButtons,
  Modal,
  Text,
  TextArea,
} from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import {
  centsToEurosWithCurrency,
  placeholderItemImage,
  TODAY_DATE,
} from '@magnetic/utils';
import { useState } from 'react';
import {
  CurrentUser,
  FormSubmitParams,
  Item,
  SingleChefServiceFormData,
} from '@magnetic/interfaces';

interface Props {
  onSubmit: (data: FormSubmitParams<SingleChefServiceFormData>) => void;
  formData?: any;
  onCancel?: () => void;
  user?: CurrentUser;
  item?: Item;
}

export function SingleChefServiceForm({
  onSubmit,
  formData,
  onCancel,
  user,
  item,
}: Props) {
  const currentSelectItem = item;
  const [amount, setAmount] = useState(formData?.numberOfPeople || 8);

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
    onSubmit({ form: formData, quantity: amount });
  };

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Menu Service</h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="p-10">
            <Text className="mb-2">Number of People</Text>
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
                    if (amount > 8) {
                      setAmount(amount - 1);
                    }
                  }}
                />
              </div>
            </div>
            <Text className="mb-4 text-primary-600" size="1">
              Minimum charge for 8 people
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Text className="mb-2">Children & Ages</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="e.g., 2 kids, ages 5 and 8"
                  {...register('kidsAges', {
                    required: 'Children & ages are required',
                  })}
                />
                {errors.kidsAges && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.kidsAges.message}
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
            <div className="mt-6">
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

export default SingleChefServiceForm;
