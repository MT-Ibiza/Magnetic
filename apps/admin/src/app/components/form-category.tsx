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

interface Props {
  category?: Category;
  onCancel?: () => void;
  onSave?: (category: Category) => void;
}

function FormCategory(props: Props) {
  const { category, onCancel, onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryBase>({
    defaultValues: category ? category : undefined,
  });

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
    const { name, description } = data;
    if (category) {
      await updateCategory.mutateAsync({
        name,
        description,
      });
    } else {
      await createCategory.mutateAsync({
        name,
        description,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[20px]">
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
        <Button type="submit"> {category ? 'Update' : 'Create'} Category</Button>
      </div>
    </form>
  );
}

export default FormCategory;
