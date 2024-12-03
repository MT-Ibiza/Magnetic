'use client';

import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './button';

export interface Props {
  className?: string;
}

export function RegisterForm(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <div className={`register`}>
      <div className="container">
        <div className="mb-[30px]">
          <h2 className=" flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Create an Account
          </h2>
          <p className="mt-[15px] text-center">Create a account to continue</p>
        </div>
        <div className="w-[400px] mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="block flex flex-col">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
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
                First Name
              </span>
              <Input
                type="text"
                placeholder="First Name"
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
                Last Name
              </span>
              <Input
                type="text"
                placeholder="Last Name"
                className="mt-1"
                {...register('last_name', { required: true })}
              />
              {errors.last_name && (
                <p className="text-[12px] mt-1 text-red-500">
                  Last Name is required
                </p>
              )}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                type="password"
                placeholder="********"
                className="border-neutral-200 mt-1"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="text-[12px] mt-1 text-red-500">
                  Password is required
                </p>
              )}
            </label>
            <Button type="submit">Create account</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
