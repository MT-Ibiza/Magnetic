import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useApp } from '../../../hooks/useApp';
import Modal from '../../modal';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FormSubmitParams } from '@magnetic/interfaces';
import { TODAY_DATE } from '../../../constants';

export interface WeeklyChefServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  childrenAges: string;
  location: string;
  commentsPreference: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyChefServiceFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          date: formData.date,
          startTime: formData.startTime,
          numberOfPeople: formData.numberOfPeople,
          childrenAges: formData.childrenAges,
          location: formData.location || user?.accommodation,
          firstMealRequests: formData.firstMealRequests,
          commentsPreference: formData.commentsPreference,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: WeeklyChefServiceFormData) => {
    onSubmit({ form: data });
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
                    required: 'Children and Ages are required',
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
              <Text className="mb-2">
                First Meal Requests (1st Dinner & 1st Breakfast)
              </Text>
              <TextArea
                className="w-full"
                placeholder="First dinner and breakfast requests"
                {...register('firstMealRequests')}
              />
            </div>
            <div>
              <Text className="mb-2">Comments & Preferences</Text>
              <TextArea
                className="w-full"
                placeholder="Any preferences or special comments"
                {...register('commentsPreference')}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between gap-3 w-full">
            <h2 className="text-xl">
              Total:{' '}
              {centsToEurosWithCurrency(currentSelectItem?.priceInCents || 0)}
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
