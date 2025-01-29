import { Package, NewPackage, EditPackage } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { editPackage, newPackage } from '../../apis/api-packages';

export interface FormPackagesData {
  name: string;
  description?: string;
  features?: string;
  priceInCents: number;
}

export interface Props {
  className?: string;
  plan?: Package;
}

export function PackagesForm(props: Props) {
  const { className, plan } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormPackagesData>({
    defaultValues: plan
      ? {
          name: plan.name,
          description: plan.description,
          features: plan.features,
          priceInCents: plan.priceInCents,
        }
      : undefined,
  });

  const [description, setDescription] = useState(plan?.description);
  const [features, setFeatures] = useState(plan?.features);

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
      const packageId = plan?.id || 0;
      return editPackage(packageId, data);
    },
    onSuccess: () => {
      toast.success(`Service updated!`);
    },
    onError: () => {
      toast.success(`Service couldn't be update!`);
    },
  });

  const onSubmit = async (data: FormPackagesData) => {
    const { name, priceInCents } = data;
    if (plan) {
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

  const modules = {
    toolbar: [[{ list: 'ordered' }, { list: 'bullet' }]],
  };

  const formats = ['list'];

  return (
    <>
      <div className={`service-form`}>
        <div className="bg-base-100 listingSection__wrap">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Package Name</Text>
                <Input
                  type="text"
                  placeholder="Example: Diamond"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    Service name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text size="1">Price</Text>
                <Input
                  type="number"
                  placeholder="Example: 10000"
                  {...register('priceInCents', { required: false })}
                />
                {errors.priceInCents && (
                  <p className="text-[12px] text-red-500">Price is required</p>
                )}
              </div>
              <div className="flex flex-col gap-[10px] pb-[70px] lg:pb-[40px]">
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
                  defaultValue={features}
                  onChange={setFeatures}
                  modules={modules}
                  className="h-[200px]"
                  formats={formats}
                />
              </div>
            </div>
            <div className="flex gap-[10px] justify-end pt-[80px]">
              <Button variant="outline" href={'/packages'} type="submit">
                Cancel
              </Button>
              <Button
                loading={createPackage.isPending || updatePackages.isPending}
                type="submit"
              >
                {plan ? 'Update Package' : 'Create Package'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PackagesForm;
