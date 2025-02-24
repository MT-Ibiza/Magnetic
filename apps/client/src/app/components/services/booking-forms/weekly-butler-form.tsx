import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/useAuth';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeeklyButlerServiceFormData>({
    defaultValues: formData
      ? {
          service: formData.service,
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
      <h2 className="text-2xl font-bold text-center mb-6">
        Weekly Butler/Waiter Service
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Service</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Describe the butler/waiter service required"
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
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.location.message}
              </p>
            )}
          </div>
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

export default WeeklyButlerServiceForm;
