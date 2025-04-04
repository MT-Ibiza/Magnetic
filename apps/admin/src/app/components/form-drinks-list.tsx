import { Item } from '@magnetic/interfaces';
import { Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import { DrinksListBase } from 'libs/interfaces/src/lib/drinks';
import DrinksListHandle from './drinks-list-handle';

interface Props {
  list?: DrinksListBase;
  drinks: Item[];
}
function FormDrinksList({ list, drinks }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DrinksListBase>({
    defaultValues: list ? { ...list } : undefined,
  });

  const onSubmit = async (data: DrinksListBase) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex gap-5">
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
            Description
          </label>
          <Input
            id="description"
            type="text"
            {...register('description')}
            className="mt-2"
          />
        </div>
      </div>
      <DrinksListHandle drinks={drinks} />
    </form>
  );
}

export default FormDrinksList;
