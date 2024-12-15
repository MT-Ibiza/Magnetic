import {
  Category,
  EditItem,
  Item,
  ItemBase,
  ItemVariant,
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
import {
  centsToEuros,
  centsToEurosWithCurrency,
  eurosToCents,
} from '@magnetic/utils';
import Select from 'react-select';
import { useState } from 'react';
import FormCategory from '../form-category';
import FormVariant from '../form-variant';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

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
  const categoryFound = categories.find(
    (category) => category.value == item?.categoryId
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openForm, setOpenForm] = useState('');
  const [selectedVariant, setSelectedVariant] = useState<ItemVariant>();
  const [itemCategories, setItemCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryFound);

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
    const { name, description, priceInCents, categoryId } = data;
    if (editMode) {
      await updateItem.mutateAsync({
        name,
        description,
        priceInCents: eurosToCents(Number(priceInCents)),
        serviceId,
        categoryId: categoryId || null,
      });
    } else {
      await createItem.mutateAsync({
        name,
        description,
        priceInCents: eurosToCents(Number(priceInCents)),
        serviceId,
        categoryId: categoryId || null,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6">
          <div className="main-info flex-1 space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Product Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter the Service name"
                {...register('name', { required: true })}
                className="mt-2"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">Name is required</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="priceInCents"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Price Product
              </label>
              <Input
                id="priceInCents"
                type="number"
                min={1}
                step={0.01}
                placeholder="Enter the price product"
                {...register('priceInCents', { required: true })}
                className="mt-2"
              />
              {errors.priceInCents && (
                <p className="text-xs text-red-500 mt-1">
                  Product price is required
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Description
              </label>
              <TextArea
                id="description"
                placeholder="Describe your product here"
                {...register('description', { required: true })}
                className="mt-2"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  Description is required
                </p>
              )}
            </div>

            <div className="media mt-6">
              <UploadImage onChange={(file) => {}} height="400px" />
            </div>
          </div>

          <div className="adicional-info flex-1 space-y-6">
            <div className="category bg-base-100 border rounded-lg p-6">
              <div className="flex justify-between items-center border-b pb-2">
                <Text className="font-semibold text-lg">Category</Text>
                <Text
                  className="text-primary-500 mt-2 cursor-pointer"
                  onClick={() => {
                    toggleDrawer();
                    setOpenForm('category');
                  }}
                >
                  + New Category
                </Text>
              </div>
              <Select
                isClearable
                options={itemCategories}
                value={selectedCategory}
                onChange={(category) => {
                  setSelectedCategory(category ? category : undefined);
                  setValue('categoryId', category ? category.value : undefined);
                }}
                className="mt-2"
              />
            </div>

            <div className="variants bg-base-100 border rounded-lg p-6">
              <div className="flex justify-between items-center pb-2">
                <Text className="font-semibold text-lg">Product Variants</Text>
                <Text
                  className="text-primary-500 text-md font-medium cursor-pointer"
                  onClick={() => {
                    toggleDrawer();
                    setOpenForm('variant');
                  }}
                >
                  + New Variant
                </Text>
              </div>
              <div className="space-y-3">
                {item?.variants.length ? (
                  item.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-3 rounded-md"
                    >
                      <div className="flex gap-4">
                        <Text className="font-medium text-gray-800">
                          <div>
                            {item.name} - {variant.name}
                          </div>
                        </Text>
                        <Text className="text-gray-500">
                          {`${centsToEurosWithCurrency(variant.priceInCents)}`}
                        </Text>
                      </div>
                      <div className="flex gap-4">
                        <FaEdit
                          onClick={() => {
                            setSelectedVariant(variant);
                            setOpenForm('variant');
                            toggleDrawer();
                          }}
                          className="cursor-pointer hover:scale-110 transition-transform"
                          size={18}
                        />
                        <FaTrashAlt
                          onClick={() => {}}
                          className="cursor-pointer hover:scale-110 transition-transform"
                          size={18}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-zinc-50 dark:bg-zinc-500 p-5 text-center">
                    <Text className="text-gray-500" size="1">
                      Variables are products similar
                    </Text>
                    <Text className="text-gray-500" size="1">
                      but with different price
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-6 mt-8">
          <Button
            onClick={(e) => {
              e.preventDefault();
              onCancel && onCancel();
            }}
            variant="outline"
            className="px-8 py-2"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-8 py-2">
            {item ? 'Update Item' : 'Create Item'}
          </Button>
        </div>
      </form>

      <DrawerContent
        title={openForm === 'category' ? 'New Category' : 'New Variant'}
        open={openDrawer}
        onClose={() => {
          toggleDrawer();
          setSelectedVariant(undefined);
        }}
      >
        <>
          {openForm === 'category' && (
            <FormCategory
              onCancel={toggleDrawer}
              onSave={(category) => {
                toggleDrawer();
                setValue('categoryId', category.id);
                const newCategory = {
                  label: category.name,
                  value: category.id,
                };
                setSelectedCategory(newCategory);
                setItemCategories(itemCategories.concat(newCategory));
              }}
            />
          )}
          {openForm === 'variant' && item && (
            <FormVariant
              onCancel={toggleDrawer}
              itemId={item.id}
              variant={selectedVariant}
              onSave={() => {
                setSelectedVariant(undefined);
              }}
            />
          )}
        </>
      </DrawerContent>
    </>
  );
}

export default FormItem;
