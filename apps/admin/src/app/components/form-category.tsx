import {
  Category,
  CategoryBase,
  EditCategory,
  NewCategory,
} from '@magnetic/interfaces';
import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { editCategory, newCategory } from '../apis/api-categories';
import { toast } from 'sonner';
import { useServices } from '../hooks/useServices';
import { useEffect, useState } from 'react';
import { ALL_FORMS_CHEFS } from '../constants';

interface Props {
  category?: Category;
  defaultServiceId?: number;
  onCancel?: () => void;
  onSave?: (category: Category) => void;
}

function FormCategory(props: Props) {
  const { category, defaultServiceId, onCancel, onSave } = props;
  const [chefServiceId, setChefServiceId] = useState<number>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CategoryBase>({
    defaultValues: category ? category : undefined,
  });

  const { services, isLoading } = useServices();

  useEffect(() => {
    if (services.length > 0) {
      const chefService = services.find(
        (service) => service.serviceType === 'chefs'
      );
      chefService && setChefServiceId(chefService.id);
    }
  }, [services]);

  const createCategory = useMutation<Category, Error, NewCategory>({
    mutationFn: (data: NewCategory) => {
      return newCategory(data);
    },
    onSuccess: (category) => {
      onSave && onSave(category);
      toast.success(`Category created!`);
    },
    onError: () => {
      toast.success(`Category couldn't be created!`);
    },
  });

  const updateCategory = useMutation<Category, Error, EditCategory>({
    mutationFn: (data: EditCategory) => {
      const categoryId = category?.id || 0;
      return editCategory(categoryId, data);
    },
    onSuccess: (category) => {
      onSave && onSave(category);
      toast.success(`Category updated!`);
    },
    onError: () => {
      toast.success(`Category couldn't be update!`);
    },
  });

  const onSubmit = async (data: CategoryBase) => {
    const { name, description, serviceId, formType } = data;
    if (category) {
      await updateCategory.mutateAsync({
        name,
        description,
        serviceId: defaultServiceId || Number(serviceId),
        formType,
      });
    } else {
      await createCategory.mutateAsync({
        name,
        description,
        serviceId: defaultServiceId || Number(serviceId),
        formType,
      });
    }
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Text>Service</Text>
          <select
            className="select select-bordered w-full "
            {...register('serviceId')}
            defaultValue={defaultServiceId}
            disabled={defaultServiceId !== undefined}
          >
            {services.map((service, index) => (
              <option value={service.id} key={index}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        {watch('serviceId') == chefServiceId && (
          <div className="flex flex-col gap-[10px]">
            <Text size="1">Form Type</Text>
            <select
              className="select select-bordered w-full"
              {...register('formType')}
            >
              <option value="">-- Select a form --</option>
              {ALL_FORMS_CHEFS.map((service, index) => (
                <option value={service.key} key={index}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-[10px]">
          <Text>Name</Text>
          <Input
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          {errors.name && <Text.TextInputError text="Name is required" />}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Description</Text>
          <TextArea
            placeholder="Short description"
            {...register('description')}
          />
        </div>
      </div>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button
          onClick={() => {
            onCancel && onCancel();
          }}
          variant="outline"
          type="button"
        >
          Cancel
        </Button>
        <Button
          loading={createCategory.isPending || updateCategory.isPending}
          type="submit"
        >
          {category ? 'Update Category' : 'Create Category'}
        </Button>
      </div>
    </form>
  );
}

export default FormCategory;
