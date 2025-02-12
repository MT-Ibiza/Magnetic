import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface WeeklyChefServiceFormData {
  service: string;
  date: string;
  startTime: string;
  numberOfPeople: number;
  kidsAges: string;
  location: string;
  dietaryComments: string;
  shoppingListRequests: string;
  firstMealRequests: string;
}

interface Props {
  onSubmit: (data: WeeklyChefServiceFormData) => void;
  formData?: any;
  onCancel?: () => void;
}

export function WeeklyChefServiceForm({ onSubmit, formData, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WeeklyChefServiceFormData>({
    defaultValues: formData
      ? {
          service: formData.service,
          date: formData.date,
          startTime: formData.startTime,
          numberOfPeople: formData.numberOfPeople,
          kidsAges: formData.kidsAges,
          location: formData.location,
          dietaryComments: formData.dietaryComments,
          shoppingListRequests: formData.shoppingListRequests,
          firstMealRequests: formData.firstMealRequests,
        }
      : undefined,
  });

  const handleFormSubmit = async (data: WeeklyChefServiceFormData) => {
    onSubmit(data);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-center mb-6">
        Weekly Chef Service
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Service</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Describe the weekly service required"
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
        <div>
          <Text className="mb-2">Shopping List Requests</Text>
          <TextArea
            className="w-full"
            placeholder="Any shopping list requests for ingredients"
            {...register('shoppingListRequests')}
          />
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

export default WeeklyChefServiceForm;
