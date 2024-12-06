import { Item } from '@magnetic/interfaces';
import { Button, Input, UploadImage } from '@magnetic/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';

export interface Props {
  className?: string;
  onCancel: () => void;
  item?: Item;
}

export function FormProduct(props: Props) {
  const { item, onCancel } = props;

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
            <p className="text-[12px] text-red-500">Name is required</p>
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
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button
          onClick={() => {
            onCancel && onCancel();
          }}
          variant="outline"
          type="submit"
        >
          Cancel
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  );
}

export default FormProduct;
