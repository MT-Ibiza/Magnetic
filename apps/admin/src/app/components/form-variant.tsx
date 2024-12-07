import {
  EditProvider,
  ItemVariant,
  ItemVariantBase,
  NewProvider,
  Provider,
} from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { editProvider, newProvider } from '../apis/api-providers';

interface Props {
  variant?: ItemVariant;
  onCancel: () => void;
}

function FormVariant(props: Props) {
  const { variant, onCancel } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemVariantBase>({
    defaultValues: variant ? variant : undefined,
  });

  // const createProvider = useMutation<Provider, Error, NewProvider>({
  //   mutationFn: (data: NewProvider) => {
  //     return newProvider(data);
  //   },
  //   onSuccess: () => {
  //     toast.success(`Service created!`);
  //   },
  //   onError: () => {
  //     toast.success(`Service couldn't be created!`);
  //   },
  // });

  // const updateProvider = useMutation<Provider, Error, EditProvider>({
  //   mutationFn: (data: EditProvider) => {
  //     const providerId = provider?.id || 0;
  //     return editProvider(providerId, data);
  //   },
  //   onSuccess: () => {
  //     toast.success(`Provider updated!`);
  //   },
  //   onError: () => {
  //     toast.success(`Provider couldn't be update!`);
  //   },
  // });

  const onSubmit = async (data: ItemVariantBase) => {
    // const { name, email, website } = data;
    // if (provider) {
    //   await updateProvider.mutateAsync({
    //     name,
    //     email,
    //     website,
    //   });
    // } else {
    //   await createProvider.mutateAsync({
    //     name,
    //     email,
    //     website,
    //   });
    // }
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
            type="submit"
          >
            Cancel
          </Button>
          <Button type="submit">Create Variant</Button>
        </div>
      </form>
    </div>
  );
}

export default FormVariant;
