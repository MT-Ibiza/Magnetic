import { NewService, Package, Service } from '@magnetic/interfaces';
import { Button, Input, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newService } from '../apis/api-services';

export interface FormServiceData {
  name: string;
  description: string;
  packageId: number;
  cover: File;
}

export interface Props {
  className?: string;
  packages: Package[];
}

export function ServiceForm(props: Props) {
  const { packages } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormServiceData>();
  const [description, setDescription] = useState('');

  const packageOptions = packages.map((packagePlan) => {
    return {
      label: packagePlan.name,
      value: packagePlan.id,
    };
  });

  const createService = useMutation<Service, Error, NewService>({
    mutationFn: (data: NewService) => {
      return newService(data);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = async (data: FormServiceData) => {
    const { name, packageId } = data;
    await createService.mutateAsync({
      name,
      description,
      packageId: Number(packageId),
      items: [],
    });
  };

  return (
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
                <span className="text-neutral-800 dark:text-neutral-200">
                  Service Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter the Service name"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    Service name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <select
                  {...register('packageId', {
                    required: {
                      value: true,
                      message: 'Package is required',
                    },
                  })}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {packageOptions.map((option, index) => (
                    <option value={option.value} key={index}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Service Description
                </span>
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
  );
}

export default ServiceForm;
