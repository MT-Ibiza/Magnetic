import {
  DrinksList,
  DrinksListBase,
  Item,
  NewDrinksList,
} from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import DrinksListHandle from './drinks-list-handle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import slugify from 'slugify';
import { useMutation } from '@tanstack/react-query';
import { newDrinkList } from '../apis/api-drinks';
import { toast } from 'sonner';
import { URL_FRONTED } from '../constants';

interface Props {
  list?: {
    name: string;
    itemsIds: number[];
  };
  drinks: Item[];
}
function FormDrinksList({ list, drinks }: Props) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const itemsIds = list?.itemsIds || [];
  const initialItems = drinks.filter((drink) => itemsIds.includes(drink.id));
  const [selectedItems, setSelectedItems] = useState<Item[]>(initialItems);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DrinksListBase>({
    defaultValues: list ? { ...list } : undefined,
  });

  const slug = slugify(watch('name') || '', { lower: true });

  const createList = useMutation<DrinksList, Error, NewDrinksList>({
    mutationFn: (data) => {
      setIsSaving(true);
      return newDrinkList(data);
    },
    onSuccess: () => {
      toast.success('New List Created!');
      setIsSaving(false);
    },
    onError: (error) => {
      toast.error('The list could not be created');
      setIsSaving(false);
    },
  });

  const onSubmit = async (data: DrinksListBase) => {
    await createList.mutateAsync({
      name: data.name,
      itemsIds: selectedItems.map((item) => item.id),
    });
  };

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
              {URL_FRONTED}
              <strong>{slug}</strong>
            </Text>
          </div>
        </div>
      </div>
      <DrinksListHandle
        drinks={drinks}
        onItemsChange={setSelectedItems}
        listItems={initialItems}
      />

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
