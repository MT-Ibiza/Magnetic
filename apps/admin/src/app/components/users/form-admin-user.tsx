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

export interface FormAdminUserData {
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
  onCancel: () => void;
}

export function FormAdminUser(props: Props) {
  const { className, user, onSaveSuccess, onCancel } = props;
  const editMode = !!user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdminUserData>({
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

  const onSubmit = async (data: FormAdminUserData) => {
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
        role: 'admin',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Text>Name</Text>
          <Input
            type="text"
            placeholder="Full Name"
            {...register('name', { required: true })}
          />

          {errors.name && <Text.TextInputError text="Name is required" />}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Email</Text>
          <Input
            type="email"
            // placeholder="client email"
            {...register('email', { required: true })}
          />
          {errors.email && <Text.TextInputError text="Email is required" />}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Phone</Text>
          <Input
            type="tel"
            // placeholder="client phone"
            {...register('phone')}
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>{editMode ? 'New Password' : 'Password'}</Text>
          <Input
            type="password"
            placeholder="*******"
            {...register('password', { required: true })}
          />

          {errors.password && (
            <Text.TextInputError text="Password is required" />
          )}
        </div>
      </div>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            onCancel && onCancel();
          }}
          color="neutral"
        >
          Cancel
        </Button>
        <Button type="submit">
          {editMode ? 'Update User' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}

export default FormAdminUser;
