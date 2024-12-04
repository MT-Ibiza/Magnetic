'use client';

import { Button, Input, TextArea, UploadImage } from '@magnetic/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const [description, setDescription] = useState('');

  return (
    <div className={`service-form`}>
      <div className="">
        <div className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <UploadImage
                onChange={(file) => setValue('cover_image', file)}
                height="400px"
              />
              <div className="flex flex-col gap-[10px]">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Service Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter the Service name"
                  {...register('home_name', { required: true })}
                />
                {errors.home_name && (
                  <p className="text-[12px] text-red-500">
                    Home name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Home Description
                </span>
                <ReactQuill
                  theme="snow"
                  defaultValue={description}
                  onChange={setDescription}
                  className="h-[200px]"
                />
              </div>
            </div>
            <div className="flex justify-end pt-[80px]">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
