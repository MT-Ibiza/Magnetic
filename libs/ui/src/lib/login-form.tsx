'use client';

import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './button';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmitForm(data: any) {
    onSubmit(data);
  }

  return (
    <div className={`login`}>
      <div className="container">
        <h2 className="mb-[30px] flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="w-[400px] mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmitForm)}
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
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
