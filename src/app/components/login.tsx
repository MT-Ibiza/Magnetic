'use client'

import { Button, Text, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";


interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmitForm(data: any) {
    onSubmit && onSubmit(data);
  }

  return (
    <div className="p-3 w-3/4 lg:w-1/4">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <Text as="label" className="mb-2">
            Email
          </Text>
          <TextField.Root
            size="3"
            placeholder="user@email.com"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">El email es requerido</p>
          )}
        </div>
        <div className="mb-4">
          <Text as="label" className="mb-2">
            Password
          </Text>
          <TextField.Root
            size="3"
            type="password"
            {...register("password", { required: true })}
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">La contraseña es requerida</p>
          )}
        </div>
        <Button
          size="3"
          className="cursor-pointer w-full mt-2 mb-2 bg-primary hover:bg-primary-800"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
