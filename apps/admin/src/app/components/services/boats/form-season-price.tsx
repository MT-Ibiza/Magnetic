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

const months = moment.months().map((month, index) => ({
  value: index + 1,
  label: month,
}));

function FormSeasonPrice({
  itemId,
  onSave,
}: {
  itemId: number;
  onSave: () => void;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SeasonPriceBase>();

  const createSeasonPrice = useMutation<SeasonPrice, Error, NewSeasonPrice>({
    mutationFn: (data) => {
      setIsSaving(true);
      return newSeasonPrice(data);
    },
    onSuccess: () => {
      setIsSaving(false);
      toast.success(`Season Price created!`);
      onSave();
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('Season Price could not be created');
    },
  });

  const updateSeasonPrice = useMutation<SeasonPrice, Error, EditSeasonPrice>({
    mutationFn: (data) => {
      setIsSaving(true);
      return editSeasonPrice(itemId, data);
    },
    onSuccess: () => {
      setIsSaving(false);
      toast.success(`Season Price updated!`);
      // onSave();
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('Season Price could not be updated');
    },
  });

  const [fullMonth, setFullMonth] = useState(true);

  const startMonth = watch('startMonth');
  const endMonth = watch('endMonth');

  const handleFullMonthChange = (checked: boolean) => {
    setFullMonth(checked);
    if (checked && startMonth && endMonth) {
      setValue('startDay', 1);
      setValue('endDay', moment(startMonth, 'M').daysInMonth());
    }
  };

  const onSubmit = async (data: SeasonPriceBase) => {
    console.log('Form Data:', data);
    await createSeasonPrice.mutateAsync(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 border rounded-lg"
    >
      <div>
        <label>Item ID:</label>
        <input
          type="number"
          value={itemId}
          readOnly
          className="border p-2 rounded w-full bg-gray-200 cursor-not-allowed"
        />
      </div>

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
              {...register('startDay', { required: true, min: 1, max: 31 })}
              className="border p-2 rounded w-full"
            />
            {errors.startDay && (
              <p className="text-red-500">Ingrese un día válido (1-31)</p>
            )}
          </div>

          <div>
            <label>End Month:</label>
            <select
              {...register('endMonth', { required: true })}
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
              {...register('endDay', { required: true, min: 1, max: 31 })}
              className="border p-2 rounded w-full"
            />
            {errors.endDay && (
              <p className="text-red-500">Ingrese un día válido (1-31)</p>
            )}
          </div>
        </>
      )}

      <div>
        <label>Price in Cents:</label>
        <input
          type="number"
          {...register('priceInCents', { required: true, min: 1 })}
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
