import { Item, ParamsPublicList, PublicList } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';
import PublicListItemsHandle from './public-lists/public-list-items-handle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import slugify from 'slugify';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { URL_FRONTED } from '../constants';
import { editPublicList, newPublicList } from '../apis/api-public-lists';

interface Props {
  list?: {
    name: string;
    itemsIds: number[];
    id: number;
  };
  type: string;
  items: Item[];
  onSave: () => void;
}

function FormPublicList({ list, items, type, onSave }: Props) {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const itemsIds = list?.itemsIds || [];
  const initialItems = items.filter((item) => itemsIds.includes(item.id));
  const [selectedItems, setSelectedItems] = useState<Item[]>(initialItems);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    defaultValues: list ? { ...list } : undefined,
  });

  const slug = slugify(watch('name') || '', { lower: true });

  const createList = useMutation<PublicList, Error, ParamsPublicList>({
    mutationFn: (data) => {
      setIsSaving(true);
      return newPublicList(data);
    },
    onSuccess: () => {
      toast.success('New List Created!');
      setIsSaving(false);
      onSave();
    },
    onError: (error) => {
      toast.error('The list could not be created');
      setIsSaving(false);
    },
  });

  const updateList = useMutation<PublicList, Error, ParamsPublicList>({
    mutationFn: (data) => {
      const id = list?.id || 0;
      setIsSaving(true);
      return editPublicList(id, data);
    },
    onSuccess: () => {
      toast.success('List Updated!');
      setIsSaving(false);
      onSave();
    },
    onError: (error) => {
      toast.error('The list could not be updated');
      setIsSaving(false);
    },
  });

  const onSubmit = async (data: any) => {
    if (list?.id) {
      await updateList.mutateAsync({
        name: data.name,
        itemsIds: selectedItems.map((item) => item.id),
        type,
      });
    } else {
      await createList.mutateAsync({
        name: data.name,
        itemsIds: selectedItems.map((item) => item.id),
        type,
      });
    }
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
              {'/list/'}
              <strong>{slug}</strong>
            </Text>
          </div>
        </div>
      </div>
      <PublicListItemsHandle
        type={type}
        items={items}
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

export default FormPublicList;
