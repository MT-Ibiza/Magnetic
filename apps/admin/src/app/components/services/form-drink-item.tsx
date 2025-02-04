import {
  Category,
  EditItem,
  Item,
  ItemBase,
  ItemVariant,
  NewItem,
  Service,
} from '@magnetic/interfaces';
import {
  Button,
  CardWrapper,
  DrawerContent,
  Input,
  Text,
  TextArea,
  UploadImage,
  UploadMultipleImages,
} from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { editItem, newItem } from '../../apis/api-items';
import { useNavigate } from 'react-router-dom';
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
  onSave: () => void;
  onError?: () => void;
  item?: Item;
  serviceId: number;
  serviceCategories: Category[];
}

export function FormDrinkItem(props: Props) {
  const { item, serviceId, onSave, serviceCategories } = props;
  const editMode = !!item;
  const navigate = useNavigate();
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
  const [itemVariants, setItemVariants] = useState<ItemVariant[]>(
    item?.variants || []
  );
  const [itemCategories, setItemCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryFound);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  const handleImageChange = (newFiles: File[]) => {
    setImagesFiles(newFiles);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemBase>({
    defaultValues: {
      name: item?.name,
      priceInCents: centsToEuros(item?.priceInCents || 100),
      description: item?.description,
      categoryId: item?.categoryId,
      drinkAttributes: {
        size: item?.drinkAttributes?.size,
        units: item?.drinkAttributes?.units,
      },
    },
  });

  const createItem = useMutation<Item, Error, FormData>({
    mutationFn: (data: FormData) => {
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

  const updateItem = useMutation<Item, Error, FormData>({
    mutationFn: (data: FormData) => {
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

  const onSubmit = async (data: any) => {
    const { name, description, priceInCents, categoryId, drinkAttributes } =
      data;
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append(
      'priceInCents',
      eurosToCents(Number(priceInCents)).toString()
    );
    formData.append('serviceId', serviceId.toString());
    formData.append('categoryId', categoryId ? categoryId.toString() : '');
    formData.append(
      'drinkAttributes',
      JSON.stringify({
        size: drinkAttributes.size,
        units: Number(drinkAttributes.units),
      })
    );

    imagesFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });

    if (editMode) {
      await updateItem.mutateAsync(formData);
    } else {
      await createItem.mutateAsync(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="main-info flex-1 space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Drink Name
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

            <div className="flex flex-col">
              <label
                htmlFor="priceInCents"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Price
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

            <div className="drink-attr flex flex-col lg:flex-row gap-6">
              <div className="w-full">
                <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Units
                </Text>
                <Input
                  className="mt-2 w-full"
                  type="number"
                  min={0}
                  max={10000}
                  placeholder="Enter the type of boat"
                  {...register('drinkAttributes.units', {
                    required: 'Units is required',
                  })}
                />
                {errors.drinkAttributes?.units && (
                  <p className="text-[12px] text-red-500 pt-2">
                    {errors.drinkAttributes?.units.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  Size
                </Text>
                <Input
                  className="mt-2 w-full"
                  type="text"
                  placeholder="Enter the type of boat"
                  {...register('drinkAttributes.size')}
                />
              </div>
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
              <UploadMultipleImages
                images={imagesFiles}
                onChange={handleImageChange}
                height="250px"
                existingImages={item?.images}
              />
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
                {itemVariants.length ? (
                  itemVariants.map((variant, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-3 rounded-md"
                    >
                      <div className="flex gap-4">
                        <Text className="font-medium text-gray-800">
                          <div>
                            {item?.name} - {variant.name}
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
                      Variables are similar products
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
              navigate(-1);
            }}
            variant="outline"
            className="px-8 py-2"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-8 py-2">
            {item ? 'Update Boat' : 'Create Boat'}
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
              itemName={item.name}
              onCancel={toggleDrawer}
              itemId={item.id}
              variant={selectedVariant}
              onSave={(variantUpdated) => {
                if (selectedVariant) {
                  const allVariants = itemVariants.map((variant) => {
                    return variantUpdated.id === variant.id
                      ? variantUpdated
                      : variant;
                  });
                  setItemVariants(allVariants);
                } else {
                  const allVariants = [variantUpdated].concat(itemVariants);
                  setItemVariants(allVariants);
                }
                setSelectedVariant(undefined);
                toggleDrawer();
              }}
            />
          )}
        </>
      </DrawerContent>
    </>
  );
}

export default FormDrinkItem;
