'use client';

import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './button';
import Text from './text';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  title?: string;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit, title } = props;

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
        {title && (
          <h2 className="mb-[30px] flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            {title}
          </h2>
        )}
        <div className="w-[400px] mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div className="flex flex-col">
              <Text>Email</Text>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                {...register('email', { required: true })}
              />
              {errors.email && <Text.TextInputError text="Email is required" />}
            </div>
            <div className="flex flex-col">
              <Text>Password</Text>
              <Input
                type="password"
                placeholder="********"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <Text.TextInputError text="Password is required" />
              )}
            </div>
            <Button type="submit" size={2}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
