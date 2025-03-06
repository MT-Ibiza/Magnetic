import { useEffect, useState } from 'react';
import moment from 'moment';
import {
  BoatCharterFormData,
  FormSubmitParams,
  Item,
  SeasonPrice,
} from '@magnetic/interfaces';
import {
  Button,
  CalendarCustomInput,
  Checkbox,
  Input,
  Text,
  TextArea,
} from '@magnetic/ui';
import { Controller, useForm } from 'react-hook-form';
import { useApp } from '../../../hooks/useApp';
import { searchAvailabilityBoat } from '../../../apis/api-boats';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { bookedBoatDates, getNumberMonth } from '../../../utils';
import Modal from '../../modal';

interface Props {
  onSubmit: (data: FormSubmitParams<BoatCharterFormData>) => void;
  formData?: any;
  onCancel?: () => void;
}

export function BoatCharterBookingForm({
  onSubmit,
  formData,
  onCancel,
}: Props) {
  const { currentSelectItem } = useApp();
  const { seasonPrices, priceInCents } = currentSelectItem as Item;
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);
  const seasonPrice = findSeasonPriceByMonth(seasonPrices || []);
  const [price, setPrice] = useState(seasonPrice?.priceInCents || priceInCents);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BoatCharterFormData>({
    defaultValues: formData
      ? {
          ...formData,
          date: formData.date ? moment(formData.date).toISOString() : '',
        }
      : undefined,
  });

  useEffect(() => {
    if (!currentSelectItem?.id) return;

    const fetchAvailability = async () => {
      try {
        const from = moment().format('YYYY-MM-DD'); // today
        const to = moment().add(6, 'months').format('YYYY-MM-DD'); // 6 month
        const boatId = currentSelectItem.boatAttributes?.id || 0;
        const availability = await searchAvailabilityBoat({
          boatId: boatId.toString(),
          from,
          to,
        });
        const bookedDates = bookedBoatDates(availability);
        setDisabledDates(bookedDates);
      } catch (error) {
        console.error('Error fetching boat availability:', error);
      }
    };

    fetchAvailability();
  }, [currentSelectItem?.id]);

  const handleFormSubmit = async (data: BoatCharterFormData) => {
    onSubmit({
      form: {
        ...data,
        boat: currentSelectItem?.name || '',
        date: moment(data.date).toISOString(),
      },
    });
  };

  return (
    <div className="">
      <Modal.Header onClose={onCancel}>
        <h2 className="text-2xl font-bold ">Boat Charter Booking</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          {currentSelectItem?.name}
        </span>
      </Modal.Header>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Modal.Body>
          <div className="flex flex-col gap-6 p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Text className="mb-2">Date</Text>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: 'Date is required' }}
                  render={({ field }) => (
                    <CalendarCustomInput
                      selectedDate={
                        field.value ? moment(field.value).toDate() : null
                      }
                      onSelectDate={(date) => {
                        const seasonPrice = findSeasonPriceByMonth(
                          seasonPrices,
                          date
                        );
                        const price = seasonPrice
                          ? seasonPrice.priceInCents
                          : priceInCents;
                        setPrice(price);
                        field.onChange(moment(date).toISOString());
                      }}
                      className="w-full"
                      disabledDates={disabledDates}
                    />
                  )}
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
                    required: 'Children and ages are required',
                  })}
                />
                {errors.childrenAges && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.childrenAges.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Text className="mb-2">
                Lunch Reservation - Preferred restaurant & time
              </Text>
              <TextArea
                className="w-full"
                placeholder="Describe your preferences"
                {...register('lunchReservation')}
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <Text>Comments</Text>
              <TextArea
                placeholder="Add any additional comments"
                {...register('comments')}
              />
            </div>
            <div>
              <Checkbox
                name="disclaimerAccepted"
                label="Add extra Seabob"
                defaultChecked={watch('seabob')}
                onChange={(checked) => setValue('seabob', checked)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-between gap-3 w-full">
            <h2 className="text-xl">
              Total: {centsToEurosWithCurrency(price)}
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
              <Button className='text-[18px]' radius="full" type="submit">
                Book Boat
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

function findSeasonPriceByMonth(
  seasonPrices: SeasonPrice[],
  date?: string | Date
) {
  const monthNumber = getNumberMonth(date);
  return seasonPrices.find(
    (seasonPrice) => seasonPrice.startMonth === monthNumber
  );
}

export default BoatCharterBookingForm;
