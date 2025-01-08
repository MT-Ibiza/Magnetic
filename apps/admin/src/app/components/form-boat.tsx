import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface BoatAttributesFormData {
  boatType: string;
  berth: string;
  guests: number;
  crew: number;
  beamInCentimeters: number;
  cabins: number;
  fuelConsumption: number;
  latitude: string;
  longitude: string;
  sizeInCentimeters: string;
}

interface Props {
  boat?: BoatAttributesFormData;
  onSubmit: (data: BoatAttributesFormData) => void;
}

export function FormBoat({ boat, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoatAttributesFormData>({
    defaultValues: boat || {
      boatType: '',
      berth: '',
      guests: 0,
      crew: 0,
      beamInCentimeters: 0,
      cabins: 0,
      fuelConsumption: 0,
      latitude: '',
      longitude: '',
      sizeInCentimeters: '',
    },
  });

  const handleFormSubmit = async (data: BoatAttributesFormData) => {
    onSubmit(data);
  };

  return (
    <div className="boat-attributes-form space-y-6">
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Boat Type
        </Text>
        <Input
          className="mt-2 w-full"
          type="text"
          placeholder="Enter the type of boat"
          {...register('boatType', { required: 'Boat Type is required' })}
        />
        {errors.boatType && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.boatType.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Berth
        </Text>
        <Input
          type="text"
          className="mt-2 w-full"
          placeholder="Enter the berth"
          {...register('berth', { required: 'Berth is required' })}
        />
        {errors.berth && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.berth.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Guests
        </Text>
        <Input
          type="number"
          className="mt-2 w-full"
          placeholder="Number of guests"
          {...register('guests', { required: 'Guests is required' })}
        />
        {errors.guests && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.guests.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Crew
        </Text>
        <Input
          type="number"
          className="mt-2 w-full"
          placeholder="Number of crew members"
          {...register('crew', { required: 'Crew is required' })}
        />
        {errors.crew && (
          <p className="text-[12px] text-red-500 pt-2">{errors.crew.message}</p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Beam (in cm)
        </Text>
        <Input
          type="number"
          className="mt-2 w-full"
          placeholder="Enter the beam size in centimeters"
          {...register('beamInCentimeters', { required: 'Beam is required' })}
        />
        {errors.beamInCentimeters && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.beamInCentimeters.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Cabins
        </Text>
        <Input
          type="number"
          className="mt-2 w-full"
          placeholder="Number of cabins"
          {...register('cabins', { required: 'Cabins is required' })}
        />
        {errors.cabins && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.cabins.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Fuel Consumption (liters/hour)
        </Text>
        <Input
          type="number"
          className="mt-2 w-full"
          placeholder="Fuel consumption in liters/hour"
          {...register('fuelConsumption', {
            required: 'Fuel consumption is required',
          })}
        />
        {errors.fuelConsumption && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.fuelConsumption.message}
          </p>
        )}
      </div>
      <div>
        <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
          Boat Size (in cm)
        </Text>
        <Input
          type="text"
          className="mt-2 w-full"
          placeholder="Enter the boat size in centimeters"
          {...register('sizeInCentimeters', {
            required: 'Boat size is required',
          })}
        />
        {errors.sizeInCentimeters && (
          <p className="text-[12px] text-red-500 pt-2">
            {errors.sizeInCentimeters.message}
          </p>
        )}
      </div>
      <div className="flex gap-5">
        <div className="w-full">
          <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Latitude
          </Text>
          <Input
            type="text"
            className="mt-2 w-full"
            placeholder="Enter the latitude"
            {...register('latitude')}
          />
        </div>
        <div className="w-full">
          <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
            Longitude
          </Text>
          <Input
            type="text"
            className="mt-2 w-full"
            placeholder="Enter the longitude"
            {...register('longitude')}
          />
        </div>
      </div>
    </div>
  );
}

export default FormBoat;
