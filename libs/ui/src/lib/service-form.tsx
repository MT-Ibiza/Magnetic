'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './button';
import TextArea from './text-area';

export interface Props {
  className?: string;
}

export function ServiceForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState<any>(null);

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
            <div className="grid grid-cols-2 gap-y-[25px] gap-x-[40px]">
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Home Name
                </span>
                <Input
                  type='text'
                  placeholder="Enter the Home name"
                  className="mt-1"
                  {...register('home_name', { required: true })}
                />
                {errors.home_name && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Home name is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Location
                </span>
                <Input
                  type='text'
                  placeholder="Enter the address"
                  className="mt-1"
                  {...register('location', { required: true })}
                />
                {errors.location && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Location is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Owner First Name
                </span>
                <Input
                  type='text'
                  placeholder="Enter your first name"
                  className="mt-1"
                  {...register('first_name', { required: true })}
                />
                {errors.first_name && (
                  <p className="text-[12px] mt-1 text-red-500">
                    First Name is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Owner Last Name
                </span>
                <Input
                  type='text'
                  placeholder="Enter your last name"
                  className="mt-1"
                  {...register('last_name', { required: true })}
                />
                {errors.last_name && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Last Name is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Owner Email
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Email is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Owner phone number
                </span>
                <Input
                  type='number'
                  placeholder="Enter the Owner phone number"
                  className="mt-1"
                  {...register('phone', { required: true })}
                />
                {errors.phone && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Phone is required
                  </p>
                )}
              </label>
            </div>
            <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                Home Description
                </span>
                <TextArea
                height='h-[200px]'
                  placeholder=""
                  className="mt-1"
                  {...register('home_description', { required: false })}
                />
              </label>
              <div className='flex justify-end'>
                <Button type="submit">Save changes</Button>
              </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
