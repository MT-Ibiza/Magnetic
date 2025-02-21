import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  EditSeasonPrice,
  NewSeasonPrice,
  SeasonPrice,
  SeasonPriceBase,
} from '@magnetic/interfaces';
import { useMutation } from '@tanstack/react-query';
import {
  editSeasonPrice,
  newSeasonPrice,
} from '../../../apis/api-season-price';
import { toast } from 'sonner';
import { centsToEuros, eurosToCents } from '@magnetic/utils';

const months = moment.months().map((month, index) => ({
  value: index + 1,
  label: month,
}));

function FormSeasonPrice({
  itemId,
  onSave,
  season,
}: {
  itemId: number;
  onSave: (season: SeasonPrice) => void;
  season?: SeasonPrice;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SeasonPriceBase>({
    defaultValues: season
      ? {
          ...season,
          ...{ priceInCents: centsToEuros(season.priceInCents) },
        }
      : undefined,
  });

  const createSeasonPrice = useMutation<SeasonPrice, Error, NewSeasonPrice>({
    mutationFn: (data) => {
      setIsSaving(true);
      return newSeasonPrice(data);
    },
    onSuccess: (season) => {
      setIsSaving(false);
      toast.success(`Season Price created!`);
      onSave(season);
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('Season Price could not be created');
    },
  });

  const updateSeasonPrice = useMutation<SeasonPrice, Error, EditSeasonPrice>({
    mutationFn: (data) => {
      setIsSaving(true);
      return editSeasonPrice(season?.id || 0, data);
    },
    onSuccess: (season) => {
      setIsSaving(false);
      toast.success(`Season Price updated!`);
      onSave(season);
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('Season Price could not be updated');
    },
  });

  const [fullMonth, setFullMonth] = useState(true);

  const startMonth = watch('startMonth');

  const handleFullMonthChange = (checked: boolean) => {
    setFullMonth(checked);
    if (checked && startMonth) {
      setValue('startDay', 1);
      setValue('endMonth', startMonth);
      setValue('endDay', moment(startMonth, 'M').daysInMonth());
    }
  };

  const onSubmit = async (data: SeasonPriceBase) => {
    if (fullMonth) {
      data.startDay = 1;
      data.endMonth = data.startMonth;
      data.endDay = moment(data.startMonth, 'M').daysInMonth();
    }
    const formData = {
      ...data,
      ...{
        endDay: Number(data.endDay),
        startMonth: Number(data.startMonth),
        endMonth: Number(data.endMonth),
        priceInCents: eurosToCents(data.priceInCents),
        itemId,
      },
    };

    if (season) {
      await updateSeasonPrice.mutateAsync(formData);
    } else {
      await createSeasonPrice.mutateAsync(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-lg"
    >
      <div>
        <label>
          <input
            type="checkbox"
            checked={fullMonth}
            onChange={(e) => handleFullMonthChange(e.target.checked)}
          />
          Month
        </label>
      </div>

      <div>
        <label>Start Month:</label>
        <select
          {...register('startMonth', { required: true })}
          className="border p-2 rounded w-full"
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        {errors.startMonth && (
          <p className="text-red-500">Seleccione un mes válido</p>
        )}
      </div>

      {!fullMonth && (
        <>
          <div>
            <label>Start Day:</label>
            <input
              type="number"
              {...register('startDay', {
                required: true,
                min: 1,
                max: 31,
                valueAsNumber: true,
              })}
              className="border p-2 rounded w-full"
            />
            {errors.startDay && (
              <p className="text-red-500">Ingrese un día válido (1-31)</p>
            )}
          </div>

          <div>
            <label>End Month:</label>
            <select
              {...register('endMonth', { required: true, valueAsNumber: true })}
              className="border p-2 rounded w-full"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            {errors.endMonth && (
              <p className="text-red-500">Seleccione un mes válido</p>
            )}
          </div>

          <div>
            <label>End Day:</label>
            <input
              type="number"
              {...register('endDay', {
                required: true,
                min: 1,
                max: 31,
                valueAsNumber: true,
              })}
              className="border p-2 rounded w-full"
            />
            {errors.endDay && (
              <p className="text-red-500">Ingrese un día válido (1-31)</p>
            )}
          </div>
        </>
      )}

      <div>
        <label>Price:</label>
        <input
          type="number"
          {...register('priceInCents', {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
          className="border p-2 rounded w-full"
        />
        {errors.priceInCents && (
          <p className="text-red-500">El precio debe ser mayor a 0</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Guardar
      </button>
    </form>
  );
}

export default FormSeasonPrice;
