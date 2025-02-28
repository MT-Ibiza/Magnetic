import { useEffect, useState } from 'react';
import moment from 'moment';
import { BoatCharterFormData, FormSubmitParams } from '@magnetic/interfaces';
import {
  Button,
  CalendarCustomInput,
  Input,
  Text,
  TextArea,
} from '@magnetic/ui';
import { Controller, useForm } from 'react-hook-form';
import { useApp } from '../../../hooks/useApp';
import { searchAvailabilityBoat } from '../../../apis/api-boats';
import Modal from '../../modal';
import { centsToEurosWithCurrency } from '@magnetic/utils';

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
  const [disabledDates, setDisabledDates] = useState<Date[]>([]);

  const {
    register,
    control,
    handleSubmit,
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

        const availability = await searchAvailabilityBoat({
          boatId: currentSelectItem.id.toString(),
          from,
          to,
        });

        const bookedDates = availability.flatMap(({ startDate, endDate }) => {
          const start = moment(startDate);
          const end = moment(endDate);
          return Array.from({ length: end.diff(start, 'days') + 1 }, (_, i) =>
            start.clone().add(i, 'days').toDate()
          );
        });

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
          Boat: {currentSelectItem?.name}
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
                      onSelectDate={(date) =>
                        field.onChange(moment(date).toISOString())
                      }
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
                <Text className="mb-2">Extras (e.g., Seabob)</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Add any extras like Seabob"
                  {...register('extras')}
                />
              </div>
              <div>
                <Text className="mb-2">Lunch Booking</Text>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Describe lunch preferences"
                  {...register('lunchBooking')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <Text>Comments</Text>
              <TextArea
                placeholder="Add any additional comments"
                {...register('comments')}
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
                  className=""
                  variant="outline"
                  color="neutral"
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit">Book Boat</Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </div>
  );
}

export default BoatCharterBookingForm;
