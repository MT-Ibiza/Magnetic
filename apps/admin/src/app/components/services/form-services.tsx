import {
  NewService,
  Service,
  Provider,
  EditService,
} from '@magnetic/interfaces';
import {
  Button,
  DrawerContent,
  Input,
  Text,
  TextArea,
  UploadImage,
} from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { editService, newService } from '../../apis/api-services';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import FormProvider from '../providers/form-provider';
import { useNewServiceData } from '../../hooks/useNewServiceData';
import { toast } from 'sonner';
import { ALL_SERVICES } from '../../constants';

export interface FormServiceData {
  name: string;
  description: string;
  packageId: number;
  providerId: number;
  cover?: string;
  serviceType: string;
  script?: string;
  termsAndConditions?: string;
}

export interface Props {
  className?: string;
  service?: Service;
  onSaveSuccess: () => void;
}

export function ServiceForm(props: Props) {
  const { className, service, onSaveSuccess } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };
  const [imageFile, setImageFile] = useState<File>();
  const [description, setDescription] = useState(service?.description);
  const [termsAndConditions, setTermsAndConditions] = useState(
    service?.termsAndConditions
  );
  const { isLoading, isError, data, error } = useNewServiceData();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormServiceData>({
    defaultValues: service
      ? {
          name: service.name,
          description: service.description,
          packageId: service.packageId,
          providerId: service.providerId,
          cover: service.imageUrl,
          serviceType: service.serviceType,
          script: service.script,
          termsAndConditions: service.termsAndConditions,
        }
      : undefined,
  });

  const createService = useMutation<Service, Error, FormData>({
    mutationFn: (data: FormData) => {
      return newService(data);
    },
    onSuccess: () => {
      onSaveSuccess();
      toast.success(`Service created!`);
    },
    onError: () => {
      toast.success(`Service couldn't be created!`);
    },
  });

  const updateService = useMutation<Service, Error, FormData>({
    mutationFn: (data: FormData) => {
      const serviceId = service?.id || 0;
      return editService(serviceId, data);
    },
    onSuccess: () => {
      onSaveSuccess();
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
    const { name, packageId, serviceType, script, providerId } = data;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description || '');
    formData.append('packageId', packageId.toString());
    formData.append('serviceType', serviceType);
    script && formData.append('script', script);
    providerId && formData.append('providerId', providerId.toString());
    imageFile && formData.append('imageFile', imageFile);
    termsAndConditions &&
      formData.append('termsAndConditions', termsAndConditions);
    if (service) {
      await updateService.mutateAsync(formData);
    } else {
      await createService.mutateAsync(formData);
    }
  };

  return (
    <>
      <div className={`service-form`}>
        <div className="bg-base-100 listingSection__wrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Supplier</Text>
                <select
                  className="select select-bordered w-full "
                  {...register('providerId')}
                  defaultValue={watch().providerId}
                >
                  <option value="">None</option>
                  {data.providers.map((provider, index) => (
                    <option value={provider.id} key={index}>
                      {provider.name}
                    </option>
                  ))}
                </select>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDrawer();
                    }}
                    className="text-primary-400"
                  >
                    + New Supplier
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Service Name</Text>
                <Input
                  type="text"
                  placeholder="Example: Chef Service"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    Service name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Form Type</Text>
                <select
                  className="select select-bordered w-full"
                  {...register('serviceType')}
                >
                  <option value="">-- Select a form --</option>
                  {ALL_SERVICES.map((service, index) => (
                    <option value={service.key} key={index}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Available in package</Text>
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
                <Text size="1">Script</Text>
                <Text size="1" className="text-gray-500">
                  This will be integrated into the client's app for selecting
                  and buying products or services.
                </Text>
                <TextArea
                  placeholder="Add Script to load external products"
                  {...register('script')}
                />
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Service Description</Text>
                <ReactQuill
                  theme="snow"
                  defaultValue={description}
                  onChange={setDescription}
                  className="h-[200px]"
                />
                <br />
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Terms and Conditions</Text>
                <ReactQuill
                  theme="snow"
                  defaultValue={termsAndConditions}
                  onChange={setTermsAndConditions}
                  className="h-[200px]"
                />
                <br />
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Service Image</Text>
                <UploadImage
                  imageUrl={service?.imageUrl}
                  onChange={(file) => {
                    file && setImageFile(file);
                  }}
                  height="400px"
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
      <DrawerContent
        title={'Add Supplier'}
        open={openDrawer}
        onClose={toggleDrawer}
      >
        <FormProvider onCancel={toggleDrawer} />
      </DrawerContent>
    </>
  );
}

export default ServiceForm;
