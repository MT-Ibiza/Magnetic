import { Button, Checkbox, Input, Text, TextArea } from '@magnetic/ui';
import { TODAY_DATE } from '@magnetic/utils';
import { useForm } from 'react-hook-form';

export interface ChefStaffFormData {
  menu: string;
  date: string;
  time: string;
  numberOfPeople: number;
  kidsAges: string;
  location: string;
  dietaryComments: string;
}

interface Props {
  onSubmit: (data: ChefStaffFormData) => void;
}

export function SingleChefServiceForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ChefStaffFormData>({
    defaultValues: {
      menu: '',
      date: '',
      time: '',
      numberOfPeople: 1,
      kidsAges: '',
      location: '',
      dietaryComments: '',
    },
  });

  const handleFormSubmit = async (data: ChefStaffFormData) => {
    console.log(data);

    onSubmit(data);
  };

  return (
    <div className="chef-staff-form max-w-5xl mx-auto p-6 bg-base-100 shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Single Chef Service Booking (Gold)
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text className="mb-2">Preferred Menu</Text>
            <Input
              type="text"
              className="w-full"
              placeholder="Describe your preferred menu"
              {...register('menu', { required: 'Preferred menu is required' })}
            />
            {errors.menu && (
              <p className="text-[12px] text-red-500 pt-2">
                {errors.menu.message}
              </p>
            )}
          </div>
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
          <Button type="submit">Submit Booking</Button>
        </div>
      </form>
    </div>
  );
}

export default SingleChefServiceForm;
