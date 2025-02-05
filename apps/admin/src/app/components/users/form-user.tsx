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
  phone?: string;
  password: string;
  packageId: number;
}

export interface Props {
  className?: string;
  user?: User;
  onSaveSuccess: () => void;
}

export function FormUser(props: Props) {
  const { className, user, onSaveSuccess } = props;
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
          phone: user.phone,
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
      // toast.custom((t) => (
      //   <div className="bg-green-800 text-white px-5 py-3">
      //     <h1>New Account Created!</h1>
      //   </div>
      // ));
      toast.success('New Account Created!');
      onSaveSuccess();
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
      // toast.custom((t) => (
      //   <div className="bg-green-800 text-white">
      //     <h1>New Account Created!</h1>
      //     <button onClick={() => toast.dismiss(t)}>Dismiss</button>
      //   </div>
      // ));
      toast.success('Account Updated!');
      onSaveSuccess();
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
    const { name, email, packageId, password, phone } = data;
    if (editMode) {
      await updateUser.mutateAsync({
        name,
        email,
        phone,
        packageId: Number(packageId),
      });
    } else {
      await createUser.mutateAsync({
        name,
        email,
        password,
        phone,
        packageId: Number(packageId),
        role: 'client',
      });
    }
  };

  return (
    <div className="bg-base-100 listingSection__wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <Text>Client Name</Text>
            <Input
              type="text"
              placeholder="Full Name"
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
            <Input
              type="email"
              // placeholder="client email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">Email is required</p>
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text>Client Phone</Text>
            <Input
              type="tel"
              // placeholder="client phone"
              {...register('phone')}
            />
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
              <Input
                type="password"
                placeholder="*********"
                {...register('password', { required: true })}
              />

              {errors.name && (
                <p className="text-[12px] text-red-500">Password is required</p>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-[10px] justify-end pt-[80px]">
          <Button
            variant="outline"
            href={'/clients'}
            type="submit"
            color="neutral"
          >
            Cancel
          </Button>
          <Button type="submit">
            {editMode ? 'Update User' : 'Create Account'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormUser;
