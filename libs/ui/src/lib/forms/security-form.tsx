import { FormSubmitParams } from '@magnetic/interfaces';
import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface SecurityFormData {
  service: string;
  dates: string;
  startTime: string;
  finishTime: string;
  location: string;
  comments: string;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: FormSubmitParams<SecurityFormData>) => void;
}

export function SecurityBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SecurityFormData>({
    defaultValues: {
      service: '',
      dates: '',
      startTime: '',
      finishTime: '',
      location: 'Villa Address',
      comments: '',
      paymentConfirmed: false,
    },
  });

  const handleFormSubmit = async (data: SecurityFormData) => {
    onSubmit({ form: data });
  };

  return (
    <div className="security-booking-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Security Service Booking (Platinum)
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Service</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the type of security service"
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
            <Text className="mb-2">Finish Time</Text>
            <Input
              type="time"
              className="w-full"
              {...register('finishTime', {
                required: 'Finish time is required',
              })}
            />
            {errors.finishTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.finishTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Location</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Villa Address"
              defaultValue="Villa Address"
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
          <Text className="mb-2">Comments</Text>
          <TextArea
            className="w-full"
            placeholder="Additional comments or specific requests"
            {...register('comments')}
          />
        </div>
        <Checkbox
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
        )}
        <div className="flex justify-end gap-3">
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default SecurityBookingForm;
