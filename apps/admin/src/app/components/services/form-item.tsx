import {
  Category,
  EditItem,
  Item,
  ItemBase,
  NewItem,
} from '@magnetic/interfaces';
import {
  Button,
  CardWrapper,
  DrawerContent,
  Input,
  Text,
  TextArea,
  UploadImage,
} from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { editItem, newItem } from '../../apis/api-items';
import { dollarsToCents } from '@magnetic/utils';
import Select from 'react-select';
import { useState } from 'react';
import FormCategory from '../form-category';

export interface Props {
  className?: string;
  onCancel: () => void;
  onSave: () => void;
  onError?: () => void;
  item?: Item;
  serviceId: number;
  serviceCategories: Category[];
}

export function FormItem(props: Props) {
  const { item, onCancel, serviceId, onSave, serviceCategories } = props;
  const editMode = !!item;
  const categories = serviceCategories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });
  const selectedCategory = categories.find(
    (category) => category.value == item?.categoryId
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemBase>({
    defaultValues: item
      ? { ...item, ...{ priceInCents: dollarsToCents(item.priceInCents) } }
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
    const { name, description, priceInCents, categoryId } = data;
    console.log(data);
    if (editMode) {
      await updateItem.mutateAsync({
        name,
        description,
        priceInCents: Number(priceInCents) * 100,
        serviceId,
        categoryId: categoryId || null,
      });
    } else {
      await createItem.mutateAsync({
        name,
        description,
        priceInCents: Number(priceInCents) * 100,
        serviceId,
        categoryId: categoryId || null,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 w-full">
          <div className="main-info flex-1">
            <div className="item-info flex flex-col gap-5">
              <div className="flex flex-col">
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
              <div className="flex flex-col">
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
              <div className="flex flex-col">
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
            <div className="media">
              <UploadImage onChange={(file) => {}} height="400px" />
            </div>
          </div>
          <div className="adicional-info flex-1 flex flex-col gap-5">
            <CardWrapper className="category">
              <Text>Category</Text>
              <Select
                isClearable
                options={categories}
                defaultValue={selectedCategory}
                onChange={(category) => {
                  setValue('categoryId', category ? category.value : undefined);
                }}
              />
              <Text
                className="text-red-700 mt-3"
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                + New Category
              </Text>
            </CardWrapper>
            <CardWrapper className="variants">
              <Text>Product Variants</Text>
            </CardWrapper>
          </div>
        </div>
        <div className="buttons flex">
          <Button
            onClick={() => {
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
      <DrawerContent
        title={'Add Category'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormCategory
          onCancel={toggleDrawer}
          onSave={(category) => {
            toggleDrawer();
            setValue('categoryId', category.id);
          }}
        />
      </DrawerContent>
    </>
  );
}

export default FormItem;
