import { NewProvider, Provider } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

interface Props {
  provider?: Provider;
  onCancel: () => void;
}

export interface FormProviderData extends NewProvider {}

function FormProvider(props: Props) {
  const { provider, onCancel } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProviderData>({
    defaultValues: provider
      ? {
          name: provider.name,
          email: provider.email,
          phone: provider.phone,
        }
      : undefined,
  });

  const onSubmit = async (data: FormProviderData) => {
    onCancel();
  };

  return (
    <div className="form-provider">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <Text>Provider Name</Text>
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
            <Text>Webiste</Text>
            <Input
              type="url"
              placeholder="https://mysite.com"
              {...register('website')}
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
          <Button type="submit">Create Provider</Button>
        </div>
      </form>
    </div>
  );
}

export default FormProvider;
