import { NewProvider, Provider } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  open: boolean;
  provider?: Provider;
}

export interface FormProviderData extends NewProvider {}

function FormProvider(props: Props) {
  const { open, provider } = props;

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

  const onSubmit = async (data: FormProviderData) => {};

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="text-orange-400">
          + New Provider
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <Text>Provider Name</Text>
                <input
                  type="text"
                  placeholder="Business Name"
                  className="input input-bordered"
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
                <input
                  type="email"
                  placeholder="business email"
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-500">Email is required</p>
                )}
              </div>

              <div className="flex flex-col gap-[10px]">
                <Text>Webiste</Text>
                <input
                  type="url"
                  placeholder="https://mysite.com"
                  className="input input-bordered"
                  {...register('website')}
                />
              </div>
            </div>
            <div className="flex gap-[10px] justify-end pt-[80px]">
              <Button variant="outline" href={'/users'} type="submit">
                Cancel
              </Button>
              <Button type="submit">Create Provider</Button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
}

export default FormProvider;
