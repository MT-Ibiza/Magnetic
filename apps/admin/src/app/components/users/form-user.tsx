import { EditUser, NewUser, User } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { editUser, newUser } from '../../apis/api-users';
import { toast } from 'sonner';
import { usePackages } from '../../hooks/usePackages';
import Loading from '../loading';
import { ErrorText } from '../error-text';

export interface FormUserData {
  name: string;
  email: string;
  password: string;
  packageId: number;
}

export interface Props {
  className?: string;
  user?: User;
}

export function FormUser(props: Props) {
  const { className, user } = props;
  const editMode = !!user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormUserData>({
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          password: undefined,
          packageId: user.packageId,
        }
      : undefined,
  });
  const { isLoading, isError, error, packagesOptions } = usePackages();

  const createUser = useMutation<User, Error, NewUser>({
    mutationFn: (data: NewUser) => {
      return newUser(data);
    },
    onSuccess: (user) => {
      toast.success(`${user.name} have now an account`);
    },
    onError: (error) => {
      toast.error('The account could not be created');
    },
  });

  const updateUser = useMutation<User, Error, EditUser>({
    mutationFn: (data: EditUser) => {
      const id = user?.id || 0;
      return editUser(id, data);
    },
    onSuccess: (user) => {
      toast.success(`User updated!`);
    },
    onError: (error) => {
      toast.error('The account could not be updated');
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  const onSubmit = async (data: FormUserData) => {
    const { name, email, packageId, password } = data;
    if (editMode) {
      await updateUser.mutateAsync({
        name,
        email,
        packageId: Number(packageId),
      });
    } else {
      await createUser.mutateAsync({
        name,
        email,
        password,
        packageId: Number(packageId),
        role: 'client',
      });
    }
  };

  return (
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
            <Text>Subscription</Text>
            <select
              className="select select-bordered w-full "
              {...register('packageId', {
                required: {
                  value: true,
                  message: 'Package is required',
                },
              })}
            >
              {packagesOptions.map((option, index) => (
                <option value={option.value} key={index}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {!editMode && (
            <div className="flex flex-col gap-[10px]">
              <Text>Password</Text>
              <input
                type="password"
                placeholder="*********"
                className="input input-bordered"
                {...register('password', { required: true })}
              />

              {errors.name && (
                <p className="text-[12px] text-red-500">Password is required</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-[10px] justify-end pt-[80px]">
          <Button variant="outline" href={'/users'} type="submit">
            Cancel
          </Button>
          <Button type="submit">
            {editMode ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormUser;
