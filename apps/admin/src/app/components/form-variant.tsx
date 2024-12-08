import {
  EditItemVariant,
  ItemVariant,
  ItemVariantBase,
  NewItemVariant,
} from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { editVariant, newVariant } from '../apis/api-variants';
import { centsToEuros, eurosToCents } from '@magnetic/utils';

interface Props {
  variant?: ItemVariant;
  onCancel: () => void;
  onSave: (variant: ItemVariant) => void;
  itemId: number;
}

function FormVariant(props: Props) {
  const { variant, onCancel, itemId, onSave } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemVariantBase>({
    defaultValues: variant
      ? {
          ...variant,
          ...{ priceInCents: centsToEuros(variant.priceInCents) },
        }
      : undefined,
  });

  const createVariant = useMutation<ItemVariant, Error, NewItemVariant>({
    mutationFn: (data: NewItemVariant) => {
      return newVariant(data);
    },
    onSuccess: (variant) => {
      onSave(variant);
      toast.success(`Service created!`);
    },
    onError: () => {
      toast.success(`Service couldn't be created!`);
    },
  });

  const updateVariant = useMutation<ItemVariant, Error, EditItemVariant>({
    mutationFn: (data: EditItemVariant) => {
      const variantId = variant?.id || 0;
      return editVariant(variantId, data);
    },
    onSuccess: (variant) => {
      onSave(variant);
      toast.success(`Provider updated!`);
    },
    onError: () => {
      toast.success(`Provider couldn't be update!`);
    },
  });

  const onSubmit = async (data: ItemVariantBase) => {
    const { name, description, priceInCents } = data;
    if (variant) {
      await updateVariant.mutateAsync({
        itemId,
        name,
        description,
        priceInCents: eurosToCents(priceInCents),
      });
    } else {
      await createVariant.mutateAsync({
        itemId,
        name,
        description,
        priceInCents: eurosToCents(priceInCents),
      });
    }
  };

  return (
    <div className="form-provider">
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
            <Text>Price</Text>
            <Input
              type="number"
              min={1}
              step={0.01}
              placeholder="Enter the variant price"
              {...register('priceInCents', { required: true })}
            />
            {errors.priceInCents && (
              <Text.TextInputError text="Price is required" />
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text>Description</Text>
            <Input
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
          <Button type="submit">
            {variant ? 'Update Variant' : 'Create Variant'}{' '}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormVariant;
