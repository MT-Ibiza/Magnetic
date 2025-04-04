import { Item } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { DrinksListBase } from 'libs/interfaces/src/lib/drinks';
import DrinksListHandle from './drinks-list-handle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import slugify from 'slugify';

interface Props {
  list?: DrinksListBase;
  drinks: Item[];
}
function FormDrinksList({ list, drinks }: Props) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DrinksListBase>({
    defaultValues: list ? { ...list } : undefined,
  });

  const onSubmit = async (data: DrinksListBase) => {
    console.log(data);
  };

  const slug = slugify(watch('name') || '', { lower: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-10">
        <div className="flex flex-col w-full">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Name
          </label>
          <Input
            id="name"
            type="text"
            {...register('name', { required: true })}
            className="mt-2"
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">Name is required</p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
          >
            Share URL
          </label>
          <div className="mt-3 border rounded-md h-[40px] bg-gray-50 text-gray-800 flex items-center pl-5">
            <Text size="1">
              {'https://bookings.magnetic-travel.com/list/drinks/'}
              <strong>{slug}</strong>
            </Text>
          </div>
        </div>
      </div>
      <DrinksListHandle drinks={drinks} />

      <div className="flex justify-end gap-6 mt-8">
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          variant="outline"
          className="px-8 py-2"
        >
          Cancel
        </Button>
        <Button type="submit" className="px-8 py-2" loading={isSaving}>
          {list ? 'Update List' : 'Create List'}
        </Button>
      </div>
    </form>
  );
}

export default FormDrinksList;
