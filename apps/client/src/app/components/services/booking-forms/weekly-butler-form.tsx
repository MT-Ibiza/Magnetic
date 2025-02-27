import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';
import { useApp } from '../../../hooks/useApp';
import Modal from '../../modal';
import { centsToEurosWithCurrency } from '@magnetic/utils';

export interface WeeklyButlerServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  location: string;
}

interface Props {
  onSubmit: (data: WeeklyButlerServiceFormData) => void;
  formData?: any;
  onCancel?: () => void;
}

export function WeeklyButlerServiceForm({
  onSubmit,
  onCancel,
  formData,
}: Props) {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const { currentSelectItem } = useApp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyButlerServiceFormData>({
    defaultValues: formData
      ? {
          service: currentSelectItem?.name || formData.service,
          date: formData.date,
          startTime: formData.startTime,
          numberOfPeople: formData.numberOfPeople,
          location: formData.location || user?.accommodation,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: WeeklyButlerServiceFormData) => {
    onSubmit(data);
  };

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold">
            Weekly Butler/Waiter Service
          </h2>
        </div>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="flex flex-col gap-6 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Service</Text>
                <Input
                  disabled
                  type="text"
                  className="w-full"
                  defaultValue={currentSelectItem?.name}
                />
              </div>
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
                <Text className="mb-2">Number of people</Text>
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
                <Text className="mb-2">Location (Your Villa)</Text>
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
                  className=""
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">Book Service</Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default WeeklyButlerServiceForm;
