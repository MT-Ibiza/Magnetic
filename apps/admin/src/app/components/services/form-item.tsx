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
  service?: Service;
}

export function FormItem(props: Props) {
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

  const onSubmit = async (data: ItemBase) => {
    const { name, description, priceInCents, categoryId } = data;
    const formData: FormData = new FormData(); 
  
    formData.append('name', name);
    formData.append('description', description);
    formData.append('priceInCents', eurosToCents(Number(priceInCents)).toString());
    formData.append('serviceId', serviceId.toString());
    formData.append('categoryId', categoryId ? categoryId.toString() : '');  
    imagesFiles.forEach((file) => {
      formData.append('imageFiles', file);  
    });
  
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: ${value.name}, ${value.size} bytes`); 
      } else {
        console.log(`${key}: ${value}`); 
      }
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

            <div className="flex flex-col">
              <label
                htmlFor="imageFiles"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Product Images
              </label>
              <UploadMultipleImages
                images={imagesFiles}
                onChange={(files) => setImagesFiles(files)} 
                height="200px"
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
              itemName={item.name}
              onCancel={toggleDrawer}
              itemId={item.id}
              variant={selectedVariant}
              onSave={(variant) => {
                toggleDrawer();
                setItemVariants([...itemVariants, variant]);
              }}
            />
          )}
        </>
      </DrawerContent>
    </>
  );
}

export default FormItem;
