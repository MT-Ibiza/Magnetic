import { NewService, Service, Provider } from '@magnetic/interfaces';
import { Button, Input, Text, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newService } from '../apis/api-services';
import { usePackages } from '../hooks/usePackages';
import Loading from './loading';
import { ErrorText } from './error-text';
import FormProvider from './form-provider';

export interface FormServiceData {
  name: string;
  description: string;
  packageId: number;
  providerId: number;
  cover?: File;
}

export interface Props {
  className?: string;
  service?: Service;
  providers: Provider[];
}

export function ServiceForm(props: Props) {
  const { className, service, providers } = props;
  const providersOptions = providers?.map((provider) => {
    return {
      label: provider.name,
      value: provider.id,
    };
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormServiceData>({
    defaultValues: service
      ? {
          name: service.name,
          description: service.description,
          packageId: service.packageId,
          providerId: service.packageId,
          cover: undefined,
        }
      : undefined,
  });
  const [description, setDescription] = useState(service?.description);
  const { isLoading, isError, error, packagesOptions } = usePackages();

  const createService = useMutation<Service, Error, NewService>({
    mutationFn: (data: NewService) => {
      return newService(data);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  const onSubmit = async (data: FormServiceData) => {
    const { name, packageId } = data;
    await createService.mutateAsync({
      name,
      description: description || '',
      packageId: Number(packageId),
      items: [],
    });
  };

  return (
    <>
      <div className={`service-form`}>
        <div className="">
          <div className="mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-[20px]">
                {/* <UploadImage
                onChange={(file) => {
                  // setValue('cover', file)
                }}
                height="400px"
              /> */}
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Provider</Text>
                  <select
                    className="select select-bordered w-full "
                    {...register('providerId')}
                  >
                    {providersOptions.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <FormProvider open={true} />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Service Name</Text>
                  <input
                    type="text"
                    placeholder="Example: Chef Service"
                    className="input input-bordered"
                    {...register('name', { required: true })}
                  />
                  {errors.name && (
                    <p className="text-[12px] text-red-500">
                      Service name is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Available in subscription</Text>
                  <select
                    className="select select-bordered w-full "
                    {...register('packageId', {
                      required: {
                        value: true,
                        message: 'Package is required',
                      },
                    })}
                  >
                    {packagesOptions.map((option, index) => (
                      <option value={option.value} key={index}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Service Description</Text>
                  <ReactQuill
                    theme="snow"
                    defaultValue={description}
                    onChange={setDescription}
                    className="h-[200px]"
                  />
                </div>
              </div>
              <div className="flex gap-[10px] justify-end pt-[80px]">
                <Button variant="outline" href={'/services'} type="submit">
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ServiceForm;
