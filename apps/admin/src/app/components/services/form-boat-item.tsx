import {
  Category,
  Item,
  ItemBase,
  ItemVariant,
  SeasonPrice,
  Service,
} from '@magnetic/interfaces';
import {
  Button,
  DrawerContent,
  Input,
  Text,
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
  eurosToCents,
  formatSeasonPrices,
} from '@magnetic/utils';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import FormSeasonPrice from './boats/form-season-price';
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

export function FormBoatItem(props: Props) {
  const { item, serviceId, onSave } = props;
  const editMode = !!item;
  const navigate = useNavigate();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [description, setDescription] = useState(item?.description);
  const [isSaving, setIsSaving] = useState(false);
  const prices = formatSeasonPrices(item?.seasonPrices || []);
  const [selectedSeason, setSelectedSeason] = useState<SeasonPrice>();

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
    defaultValues: item
      ? { ...item, ...{ priceInCents: centsToEuros(item.priceInCents) } }
      : undefined,
  });

  const createItem = useMutation<Item, Error, FormData>({
    mutationFn: (data: FormData) => {
      setIsSaving(true);
      return newItem(serviceId, data);
    },
    onSuccess: (item) => {
      setIsSaving(false);
      toast.success(`${item.name} created!`);
      onSave();
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('The product could not be created');
    },
  });

  const updateItem = useMutation<Item, Error, FormData>({
    mutationFn: (data: FormData) => {
      setIsSaving(true);
      const itemId = item?.id || 0;
      return editItem(serviceId, itemId, data);
    },
    onSuccess: () => {
      setIsSaving(false);
      toast.success(`${item?.name} updated!`);
      onSave();
    },
    onError: (error) => {
      setIsSaving(false);
      toast.error('The product could not be updated');
    },
  });

  const onSubmit = async (data: ItemBase) => {
    const { name, priceInCents, categoryId, boatAttributes, removeImagesIds } =
      data;
    console.log(description);
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('description', description || '');
    formData.append(
      'priceInCents',
      eurosToCents(Number(priceInCents)).toString()
    );
    formData.append('serviceId', serviceId.toString());
    formData.append('categoryId', categoryId ? categoryId.toString() : '');

    if (boatAttributes) {
      formData.append(
        'boatAttributes',
        JSON.stringify({
          secondName: boatAttributes.secondName,
          boatType: boatAttributes.boatType,
          port: boatAttributes.port,
          capacity: Number(boatAttributes.capacity),
          crew: Number(boatAttributes.crew),
          beamInMeters: Number(boatAttributes.beamInMeters),
          cabins: Number(boatAttributes.cabins),
          fuelConsumption: Number(boatAttributes.fuelConsumption),
          sizeInFeet: Number(boatAttributes.sizeInFeet),
          lengthInMeters: Number(boatAttributes.lengthInMeters),
          latitude: boatAttributes.latitude
            ? boatAttributes.latitude.toString()
            : '',
          longitude: boatAttributes.longitude
            ? boatAttributes.longitude.toString()
            : '',
        })
      );
    }

    imagesFiles.forEach((file) => {
      formData.append('imageFiles', file);
    });

    removeImagesIds?.forEach((id) => {
      formData.append('removeImagesIds', `${id}`);
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
          <div className="flex-1">
            <div className="main-info flex-1 space-y-6">
              <div className="flex gap-5">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                  >
                    Boat
                  </label>
                  <Input
                    id="name"
                    type="text"
                    {...register('name', { required: true })}
                    className="mt-2"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">
                      Boat is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="secondName"
                    className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                  >
                    Boat Name
                  </label>
                  <Input
                    id="secondName"
                    type="text"
                    {...register('boatAttributes.secondName')}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Type
                  </Text>
                  <Input
                    className="mt-2 w-full"
                    type="text"
                    placeholder="Enter the type of boat"
                    {...register('boatAttributes.boatType', {
                      required: 'Type is required',
                    })}
                  />
                  {errors.boatAttributes?.boatType && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.boatType.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Price
                  </Text>
                  <Input
                    type="number"
                    min={1}
                    step={0.01}
                    placeholder="Enter the price product"
                    {...register('priceInCents', { required: true })}
                    className="mt-2 w-full"
                  />
                  {errors.priceInCents && (
                    <p className="text-xs text-red-500 mt-1">
                      Product price is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Capacity
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Number of guests"
                    {...register('boatAttributes.capacity', {
                      required: 'Capacity is required',
                    })}
                  />
                  {errors.boatAttributes?.capacity && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.capacity.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Crew
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Number of crew members"
                    {...register('boatAttributes.crew', {
                      required: 'Crew is required',
                    })}
                  />
                  {errors.boatAttributes?.crew && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.crew.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Beam (m)
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Enter the beam size in centimeters"
                    {...register('boatAttributes.beamInMeters', {
                      required: 'Beam is required',
                    })}
                  />
                  {errors.boatAttributes?.beamInMeters && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.beamInMeters.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Length (m)
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Enter the boat size in centimeters"
                    {...register('boatAttributes.lengthInMeters', {
                      required: 'Boat length is required',
                    })}
                  />
                  {errors.boatAttributes?.lengthInMeters && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.lengthInMeters.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Size (ft)
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Enter the boat size in centimeters"
                    {...register('boatAttributes.sizeInFeet', {
                      required: 'Boat size is required',
                    })}
                  />
                  {errors.boatAttributes?.sizeInFeet && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.sizeInFeet.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-5">
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Fuel Consumption (liters/hour)
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Fuel consumption in liters/hour"
                    {...register('boatAttributes.fuelConsumption', {
                      required: 'Fuel consumption is required',
                    })}
                  />
                  {errors.boatAttributes?.fuelConsumption && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.fuelConsumption.message}
                    </p>
                  )}
                </div>
                <div className="w-full">
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Bert
                  </Text>
                  <Input
                    type="text"
                    className="mt-2 w-full"
                    placeholder="Enter the port"
                    {...register('boatAttributes.port', {
                      required: 'Port is required',
                    })}
                  />
                  {errors.boatAttributes?.port && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.port.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="boat-attributes-form space-y-6">
                <div>
                  <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                    Cabins
                  </Text>
                  <Input
                    type="number"
                    className="mt-2 w-full"
                    placeholder="Number of cabins"
                    {...register('boatAttributes.cabins', {
                      required: 'Cabins is required',
                    })}
                  />
                  {errors.boatAttributes?.cabins && (
                    <p className="text-[12px] text-red-500 pt-2">
                      {errors.boatAttributes?.cabins.message}
                    </p>
                  )}
                </div>
                <div className="flex gap-5">
                  <div className="w-full">
                    <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Latitude
                    </Text>
                    <Input
                      type="text"
                      className="mt-2 w-full"
                      placeholder="Enter the latitude"
                      {...register('boatAttributes.latitude')}
                    />
                  </div>
                  <div className="w-full">
                    <Text className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Longitude
                    </Text>
                    <Input
                      type="text"
                      className="mt-2 w-full"
                      placeholder="Enter the longitude"
                      {...register('boatAttributes.longitude')}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
                >
                  Description
                </label>
                <div className="mt-2">
                  <ReactQuill
                    theme="snow"
                    defaultValue={description}
                    onChange={setDescription}
                    className="mb-3"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      Description is required
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="variants bg-base-100 border rounded-lg p-6">
              <div className="flex justify-between items-center pb-2">
                <Text className="font-semibold text-lg">Season Prices</Text>
                <Text
                  className="text-primary-500 text-md font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDrawer();
                  }}
                >
                  + New Price
                </Text>
              </div>
              <div className="space-y-3">
                {prices.length ? (
                  prices.map((priceSeason, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-3 rounded-md"
                    >
                      <div className="flex gap-4">
                        <Text className="font-medium text-gray-800">
                          <div>{priceSeason.range}</div>
                        </Text>
                        <Text className="text-gray-500">
                          {priceSeason.price}
                        </Text>
                      </div>
                      <div className="flex gap-4">
                        <FaEdit
                          onClick={() => {
                            if (item) {
                              const season = item.seasonPrices.find(
                                (season) => season.id === priceSeason.id
                              );
                              season && setSelectedSeason(season);
                            }
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
            <div className="media">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-neutral-800 dark:text-neutral-200"
              >
                Images
              </label>
              <div className="mt-2">
                <UploadMultipleImages
                  images={imagesFiles}
                  onChange={handleImageChange}
                  height="250px"
                  existingImages={item?.images}
                  onRemoveExistingImage={(imageIds) => {
                    setValue('removeImagesIds', imageIds);
                  }}
                />
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
          <Button type="submit" className="px-8 py-2" loading={isSaving}>
            {item ? 'Update Boat' : 'Create Boat'}
          </Button>
        </div>
      </form>

      <DrawerContent title={'Prices'} open={openDrawer} onClose={toggleDrawer}>
        {item?.id && (
          <FormSeasonPrice
            season={selectedSeason}
            itemId={item.id}
            onSave={toggleDrawer}
          />
        )}
      </DrawerContent>
    </>
  );
}

export default FormBoatItem;
