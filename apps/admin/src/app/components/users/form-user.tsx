import { NewUser, Package, User } from '@magnetic/interfaces';
import { Button, Input, Text, UploadImage } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { newUser } from '../../apis/api-users';

export interface FormUserData {
  name: string;
  email: string;
  password: string;
  packageId: number;
}

export interface Props {
  className?: string;
  packages: Package[];
}

export function FormUser(props: Props) {
  const { packages } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormUserData>();
  const [description, setDescription] = useState('');

  const packageOptions = packages.map((packagePlan) => {
    return {
      label: packagePlan.name,
      value: packagePlan.id,
    };
  });

  const createUser = useMutation<User, Error, NewUser>({
    mutationFn: (data: NewUser) => {
      return newUser(data);
    },
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = async (data: FormUserData) => {
    const { name, email, packageId, password } = data;
    await createUser.mutateAsync({
      name,
      email,
      password,
      packageId,
      role: 'client',
    });
  };

  return (
    <div className="service-form">
      <div className="">
        <div className="mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <Text>Client Name</Text>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered"
                  {...register('name', { required: true })}
                />

                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    Service name is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text>Client Email</Text>
                <input
                  type="email"
                  placeholder="your email"
                  className="input input-bordered"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <p className="text-[12px] text-red-500">Email is required</p>
                )}
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text>Plan Subscribe</Text>
                <select
                  className="select select-bordered w-full "
                  {...register('packageId', {
                    required: {
                      value: true,
                      message: 'Package is required',
                    },
                  })}
                >
                  {packageOptions.map((option, index) => (
                    <option value={option.value} key={index}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-[10px]">
                <Text>Password</Text>
                <input
                  type="password"
                  placeholder="*********"
                  className="input input-bordered"
                  {...register('password', { required: true })}
                />

                {errors.name && (
                  <p className="text-[12px] text-red-500">
                    Password is required
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-[10px] justify-end pt-[80px]">
              <Button variant="outline" href={'/users'} type="submit">
                Cancel
              </Button>
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormUser;
