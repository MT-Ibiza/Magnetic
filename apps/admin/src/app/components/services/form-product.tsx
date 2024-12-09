import { EditItem, Item, ItemBase, NewItem } from '@magnetic/interfaces';
import { Button, Input, TextArea, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { editItem, newItem } from '../../apis/api-items';
import { centsToEuros, eurosToCents } from '@magnetic/utils';

export interface Props {
  className?: string;
  onCancel: () => void;
  onSave: () => void;
  onError?: () => void;
  item?: Item;
  serviceId: number;
}

export function FormProduct(props: Props) {
  const { item, onCancel, serviceId, onSave } = props;
  const editMode = !!item;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemBase>({
    defaultValues: item
      ? { ...item, ...{ priceInCents: centsToEuros(item.priceInCents) } }
      : undefined,
  });

  const createItem = useMutation<Item, Error, NewItem>({
    mutationFn: (data: NewItem) => {
      return newItem(serviceId, data);
    },
    onSuccess: (item) => {
      toast.success(`${item.name} created!`);
      onSave();
    },
    onError: (error) => {
      toast.error('The product could not be created');
    },
  });

  const updateItem = useMutation<Item, Error, EditItem>({
    mutationFn: (data: EditItem) => {
      const itemId = item?.id || 0;
      return editItem(serviceId, itemId, data);
    },
    onSuccess: () => {
      toast.success(`${item?.name} updated!`);
      onSave();
    },
    onError: (error) => {
      toast.error('The product could not be updated');
    },
  });

  const onSubmit = async (data: ItemBase) => {
    const { name, description, priceInCents } = data;
    if (editMode) {
      await updateItem.mutateAsync({
        name,
        description,
        priceInCents: eurosToCents(Number(priceInCents)),
        serviceId,
      });
    } else {
      await createItem.mutateAsync({
        name,
        description,
        priceInCents: eurosToCents(Number(priceInCents)),
        serviceId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[20px]">
        {/* <UploadImage
          onChange={(file) => setValue('cover_image', file)}
          height="400px"
        /> */}
        <div className="flex flex-col gap-[10px]">
          <span className="text-neutral-800 dark:text-neutral-200">
            Product Name
          </span>
          <Input
            type="text"
            placeholder="Enter the Service name"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <p className="text-[12px] text-red-500">Name is required</p>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="text-neutral-800 dark:text-neutral-200">
            Price Product
          </span>
          <Input
            type="number"
            min={1}
            step={0.01}
            placeholder="Enter the price product"
            {...register('priceInCents', { required: true })}
          />
          {errors.priceInCents && (
            <p className="text-[12px] text-red-500">
              product price is required
            </p>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="text-neutral-800 dark:text-neutral-200">
            Description
          </span>
          <TextArea
            placeholder="Describe your product here"
            {...register('description', { required: true })}
          />
          {errors.description && (
            <p className="text-[12px] text-red-500">Name is required</p>
          )}
        </div>
      </div>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button
          onClick={(e) => {
            e.preventDefault();
            onCancel && onCancel();
          }}
          variant="outline"
          type="submit"
        >
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export default FormProduct;
