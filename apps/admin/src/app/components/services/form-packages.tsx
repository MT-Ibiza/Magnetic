import {
  NewService,
  Service,
  Provider,
  EditService,
  Package,
} from '@magnetic/interfaces';
import { Button, DrawerContent, Input, Text, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { editService, newService } from '../../apis/api-services';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import FormProvider from '../form-provider';
import { useNewServiceData } from '../../hooks/useNewServiceData';
import { toast } from 'sonner';

export interface FormPackagesData {
  name: string;
  description?: string;
  features?: string;
  priceInCents: number;
}

export interface Props {
  className?: string;
  packageData?: Package;
}

export function PackagesForm(props: Props) {
  const { className, packageData } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormPackagesData>({
    defaultValues: packageData
      ? {
          name: packageData.name,
          description: packageData.description,
          features: packageData.features,
          priceInCents: packageData.priceInCents,
        }
      : undefined,
  });

  const [description, setDescription] = useState(packageData?.description);

  const onSubmit = async (data: FormPackagesData) => {
    console.log(data);
  };

  return (
    <>
      <div className={`service-form`}>
        <div className="">
          <div className="mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Package Name</Text>
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
                <div className="flex flex-col gap-[10px] pb-[40px]">
                  <Text size="1">Package Description</Text>
                  <ReactQuill
                    theme="snow"
                    defaultValue={description}
                    onChange={setDescription}
                    className="h-[200px]"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Features</Text>
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
                  {packageData ? 'Update Package' : 'Create Package'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PackagesForm;
