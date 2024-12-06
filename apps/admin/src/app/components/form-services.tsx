import {
  NewService,
  Service,
  Provider,
  EditService,
} from '@magnetic/interfaces';
import { Button, DrawerContent, Input, Text, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { editService, newService } from '../apis/api-services';
import Loading from './loading';
import { ErrorText } from './error-text';
import FormProvider from './form-provider';
import { useNewServiceData } from '../hooks/useNewServiceData';
import { toast } from 'sonner';

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
}

export function ServiceForm(props: Props) {
  const { className, service } = props;
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

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
  const { isLoading, isError, data, error } = useNewServiceData();

  const createService = useMutation<Service, Error, NewService>({
    mutationFn: (data: NewService) => {
      return newService(data);
    },
    onSuccess: () => {
      toast.success(`Service created!`);
    },
    onError: () => {
      toast.success(`Service couldn't be created!`);
    },
  });

  const updateService = useMutation<Service, Error, EditService>({
    mutationFn: (data: EditService) => {
      const serviceId = service?.id || 0;
      return editService(serviceId, data);
    },
    onSuccess: () => {
      toast.success(`Service updated!`);
    },
    onError: () => {
      toast.success(`Service couldn't be update!`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  if (!data) {
    return <Text>Service Not Found</Text>;
  }

  const onSubmit = async (data: FormServiceData) => {
    const { name, packageId } = data;
    if (service) {
      await updateService.mutateAsync({
        name,
        description: description || '',
        packageId: Number(packageId),
        items: [],
      });
    } else {
      await createService.mutateAsync({
        name,
        description: description || '',
        packageId: Number(packageId),
        items: [],
      });
    }
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
                    {data.providers.map((option, index) => (
                      <option value={option.id} key={index}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleDrawer();
                    }}
                    className="text-orange-400"
                  >
                    + New Provider
                  </button>
                  </div>
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
                    {data.packages.map((option, index) => (
                      <option value={option.id} key={index}>
                        {option.name}
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
                <Button type="submit">
                  {service ? 'Update Service' : 'Create Service'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <DrawerContent
        title={'Add Provider'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormProvider onCancel={toggleDrawer} />
      </DrawerContent>
    </>
  );
}

export default ServiceForm;
