'use client';

import { Button, Input, TextArea, UploadImage } from '@magnetic/ui';
import { useForm } from 'react-hook-form';

export interface Props {
  className?: string;
}

export function ServiceForm(props: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className={`service-form`}>
      <div className="container">
        <div className="mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <UploadImage
              onChange={(file) => setValue('cover_image', file)}
              height='400px'
            />
            <div className="grid grid-cols-1 gap-y-[25px] gap-x-[40px]">
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Service Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter the Service name"
                  className="mt-1"
                  {...register('home_name', { required: true })}
                />
                {errors.home_name && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Home name is required
                  </p>
                )}
              </label>
            </div>
            <label className="block flex flex-col">
              <span className="text-neutral-800 dark:text-neutral-200">
                Home Description
              </span>
              <TextArea
                height="h-[200px]"
                placeholder=""
                className="mt-1"
                {...register('home_description', { required: false })}
              />
            </label>
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
