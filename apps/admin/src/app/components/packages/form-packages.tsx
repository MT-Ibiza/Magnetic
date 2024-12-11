import { Package, NewPackage, EditPackage } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import { toast } from 'sonner';
import { useNewPackageData } from '../../hooks/useNewPackage';
import { editPackage, newPackage } from '../../apis/api-packages';

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
  const [features, setFeatures] = useState(packageData?.features);
  const { isLoading, isError, data, error } = useNewPackageData();

  const createPackage = useMutation<Package, Error, NewPackage>({
    mutationFn: (data: NewPackage) => {
      return newPackage(data);
    },
    onSuccess: () => {
      toast.success(`Service created!`);
    },
    onError: () => {
      toast.success(`Service couldn't be created!`);
    },
  });

  const updatePackages = useMutation<Package, Error, EditPackage>({
    mutationFn: (data: EditPackage) => {
      const packageId = packageData?.id || 0;
      return editPackage(packageId, data);
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

  const onSubmit = async (data: FormPackagesData) => {
    const { name, priceInCents } = data;
    if (packageData) {
      await updatePackages.mutateAsync({
        name,
        description: description || '',
        features: features || '',
        priceInCents: parseInt(priceInCents as unknown as string, 10),
      });
    } else {
      await createPackage.mutateAsync({
        name,
        description: description || '',
        features: features || '',
        priceInCents: parseInt(priceInCents as unknown as string, 10),
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
                <div className="flex flex-col gap-[10px] pb-[40px]">
                  <Text size="1">Features</Text>
                  <ReactQuill
                    theme="snow"
                    defaultValue={features}
                    onChange={setFeatures}
                    className="h-[200px]"
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <Text size="1">Price</Text>
                  <Input
                    type="number"
                    placeholder="Example: 10000 (for $100.00)"
                    {...register('priceInCents', { required: false })}
                  />
                  {errors.priceInCents && (
                    <p className="text-[12px] text-red-500">
                      Price is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-[10px] justify-end pt-[80px]">
                <Button variant="outline" href={'/packages'} type="submit">
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
