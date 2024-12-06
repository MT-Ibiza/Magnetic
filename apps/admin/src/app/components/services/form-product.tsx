import { Button, Input, UploadImage } from '@magnetic/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

export interface Props {
  className?: string;
}

export function FormProduct(props: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={`product-form`}>
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
                  Product Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter the Service name"
                  {...register('product_name', { required: true })}
                />
                {errors.product_name && (
                  <p className="text-[12px] text-red-500">
                    Home name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Price Product
                </span>
                <Input
                  type="number"
                  placeholder="Enter the price product"
                  {...register('price_product', { required: true })}
                />
                {errors.price_product && (
                  <p className="text-[12px] text-red-500">
                    product price is required
                  </p>
                )}
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

export default FormProduct;
