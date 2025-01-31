import { User } from '@magnetic/interfaces';
import { Button, Input, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { editAdmin, newAdmin } from '../../apis/api-users';
import { toast } from 'sonner';
import { usePackages } from '../../hooks/usePackages';
import Loading from '../loading';
import { ErrorText } from '../error-text';

export interface FormAdminUserData {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface Props {
  className?: string;
  user?: User;
  onSaveSuccess: () => void;
  onCancel: () => void;
}

export function FormAdminUser(props: Props) {
  const { user, onSaveSuccess, onCancel } = props;

  const editMode = !!user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAdminUserData>({
    defaultValues: user
      ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          password: undefined,
        }
      : undefined,
  });

  const { isLoading, isError, error, packagesOptions } = usePackages();

  const createAdmin = useMutation<User, Error, FormData>({
    mutationFn: (data: FormData) => {
      return newAdmin(data);
    },
    onSuccess: () => {
      toast.success('New Admin Account Created!');
      onSaveSuccess();
    },
    onError: () => {
      toast.error('The account could not be created');
    },
  });

  const updateAdmin = useMutation<User, Error, FormData>({
    mutationFn: (data: FormData) => {
      const id = user?.id || 0;
      return editAdmin(id, data);
    },
    onSuccess: () => {
      toast.success('Account Updated!');
      onSaveSuccess();
    },
    onError: () => {
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
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone || '');
    formData.append('password', data.password);

    if (editMode) {
      await updateAdmin.mutateAsync(formData);
    } else {
      await createAdmin.mutateAsync(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <Text>First Name</Text>
          <Input
            type="text"
            placeholder="Full Name"
            {...register('firstName', { required: true })}
          />
          {errors.firstName && (
            <Text.TextInputError text="FirstName is required" />
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Last Name</Text>
          <Input
            type="text"
            placeholder="Full Name"
            {...register('lastName', { required: true })}
          />
          {errors.firstName && (
            <Text.TextInputError text="LastName is required" />
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Email</Text>
          <Input type="email" {...register('email', { required: true })} />
          {errors.email && <Text.TextInputError text="Email is required" />}
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>Phone</Text>
          <Input type="tel" {...register('phone')} />
        </div>
        <div className="flex flex-col gap-[10px]">
          <Text>{editMode ? 'New Password' : 'Password'}</Text>
          <Input
            type="password"
            placeholder="*******"
            {...register('password', { required: !editMode })}
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
            onCancel();
          }}
          color="neutral"
        >
          Cancel
        </Button>
        <Button
          loading={createAdmin.isPending || updateAdmin.isPending}
          type="submit"
        >
          {editMode ? 'Update User' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}

export default FormAdminUser;
