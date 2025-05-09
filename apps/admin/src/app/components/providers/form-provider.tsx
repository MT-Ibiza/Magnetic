import {
  EditProvider,
  NewProvider,
  Provider,
  ProviderBase,
} from '@magnetic/interfaces';
import { Button, Input, Text, TextArea } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { editProvider, newProvider } from '../../apis/api-providers';

interface Props {
  provider?: Provider;
  onCancel: () => void;
  onSaveSuccess?: () => void;
}

export interface FormProviderData extends NewProvider {}

function FormProvider(props: Props) {
  const { provider, onCancel, onSaveSuccess } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderBase>({
    defaultValues: provider ? provider : undefined,
  });

  const createProvider = useMutation<Provider, Error, NewProvider>({
    mutationFn: (data: NewProvider) => {
      return newProvider(data);
    },
    onSuccess: () => {
      toast.success(`Service created!`);
      if (onSaveSuccess) onSaveSuccess();
    },
    onError: () => {
      toast.success(`Service couldn't be created!`);
    },
  });

  const updateProvider = useMutation<Provider, Error, EditProvider>({
    mutationFn: (data: EditProvider) => {
      const providerId = provider?.id || 0;
      return editProvider(providerId, data);
    },
    onSuccess: () => { 
      toast.success(`Supplier updated!`);
      if (onSaveSuccess) onSaveSuccess();
    },
    onError: () => {
      toast.success(`Supplier couldn't be update!`);
    },
  });

  const onSubmit = async (data: FormProviderData) => {
    const { name, email, website } = data;
    if (provider) {
      await updateProvider.mutateAsync({
        name,
        email,
        website,
      });
    } else {
      await createProvider.mutateAsync({
        name,
        email,
        website,
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
              placeholder="Business Name"
              {...register('name', { required: true })}
            />

            {errors.name && (
              <p className="text-[12px] text-red-500">
                Business Name is required
              </p>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text>Contact Email</Text>
            <Input
              type="email"
              placeholder="business email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">Email is required</p>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Text>Website</Text>
            <Input
              type="url"
              placeholder="https://mysite.com"
              {...register('website')}
            />
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
          <Button
            loading={createProvider.isPending || updateProvider.isPending}
            type="submit"
          >
            {provider?.id ? 'Update Supplier' : 'Create Supplier'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormProvider;
