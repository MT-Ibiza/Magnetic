'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './button';

export interface Props {
  className?: string;
}

export function LoginForm(props: Props) {
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
    <div className={`login`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
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
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link to="/" className="text-sm">
                  Forgot password?
                </Link>
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
            <div className="relative text-center">
              <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
                OR
              </span>
              <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
            </div>
            <div className="grid gap-3">
              <a
                href={''}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={'/images/google.svg'}
                  alt={'Continue with Google'}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {'Continue with Google'}
                </h3>
              </a>
            </div>
            <Button type="submit">Continue</Button>
          </form>
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <Link to="/">Create an account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
