import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface ChildcareFormData {
  service: string;
  kidsAges: string;
  startDateTime: string;
  finishDateTime: string;
  location: string;
  comments: string;
  disclaimerAccepted: boolean;
  paymentConfirmed: boolean;
}

interface Props {
  onSubmit: (data: ChildcareFormData) => void;
}

export function ChildcareBookingForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChildcareFormData>({
    defaultValues: {
      service: '',
      kidsAges: '',
      startDateTime: '',
      finishDateTime: '',
      location: 'Villa Address',
      comments: '',
      disclaimerAccepted: false,
      paymentConfirmed: false,
    },
  });

  const handleFormSubmit = async (data: ChildcareFormData) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <div className="childcare-booking-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Childcare Service Booking (Platinum)
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Service</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Specify the type of childcare service"
              {...register('service', { required: 'Service is required' })}
            />
            {errors.service && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.service.message}
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
            <Text className="mb-2">Start Date & Time</Text>
            <Input
              type="datetime-local"
              className="w-full"
              {...register('startDateTime', {
                required: 'Start date and time are required',
              })}
            />
            {errors.startDateTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.startDateTime.message}
              </p>
            )}
          </div>
          <div>
            <Text className="mb-2">Finish Date & Time</Text>
            <Input
              type="datetime-local"
              className="w-full"
              {...register('finishDateTime', {
                required: 'Finish date and time are required',
                validate: (value) =>
                  new Date(value) > new Date(watch('startDateTime')) ||
                  'Finish date & time must be after start date & time.',
              })}
            />
            {errors.finishDateTime && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.finishDateTime.message}
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
        <div className="space-y-4">
          <Checkbox
            name="disclaimerAccepted"
            label="I acknowledge and accept the terms of the Childcare Disclaimer (contract)."
            defaultChecked={watch('disclaimerAccepted')}
            onChange={(checked) => setValue('disclaimerAccepted', checked)}
          />
          {errors.disclaimerAccepted && (
            <p className="text-[12px] text-red-500 pt-2">
              {errors.disclaimerAccepted.message}
            </p>
          )}
          <Checkbox
            name="paymentConfirmed"
            label="I confirm 100% payment of the service at the time of booking."
            defaultChecked={watch('paymentConfirmed')}
            onChange={(checked) => setValue('paymentConfirmed', checked)}
          />
          {errors.paymentConfirmed && (
            <p className="text-[12px] text-red-500 pt-2">
              {errors.paymentConfirmed.message}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default ChildcareBookingForm;
