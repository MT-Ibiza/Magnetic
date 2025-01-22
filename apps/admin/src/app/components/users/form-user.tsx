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
  firstName: string;
  lastName: string;
  accommodation: string;
  arrivalDate: string;
  departureDate: string;
  passportNumber: string;
  passportAttachmentUrl: string;
  billingAddress: string;
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
          email: user.email,
          phone: user.phone,
          password: undefined,
          packageId: user.packageId,
          firstName: user.firstName,
          lastName: user.lastName,
          accommodation: user.accommodation,
          arrivalDate: user.arrivalDate,
          departureDate: user.departureDate,
          passportNumber: user.passportNumber,
          passportAttachmentUrl: user.passportAttachmentUrl,
          billingAddress: user.billingAddress,
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
    const {
      firstName,
      lastName,
      email,
      packageId,
      password,
      phone,
      accommodation,
      arrivalDate,
      departureDate,
      passportNumber,
      passportAttachmentUrl,
      billingAddress,
    } = data;
    if (editMode) {
      await updateUser.mutateAsync({
        packageId: Number(packageId),
        email,
        phone,
        firstName,
        lastName,
        accommodation,
        arrivalDate,
        departureDate,
        passportNumber,
        passportAttachmentUrl,
        billingAddress,
      });
    } else {
      await createUser.mutateAsync({
        role: 'client',
        password,
        packageId: Number(packageId),
        email,
        phone,
        firstName,
        lastName,
        accommodation,
        arrivalDate,
        departureDate,
        passportNumber,
        passportAttachmentUrl,
        billingAddress,
      });
    }
  };

  return (
    <div className="bg-base-100 listingSection__wrap">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>First Name</Text>
              <Input
                type="text"
                placeholder="First Name"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && (
                <p className="text-[12px] text-red-500">
                  First Name is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Last Name</Text>
              <Input
                type="text"
                placeholder="Last Name"
                {...register('lastName', { required: true })}
              />
              {errors.lastName && (
                <p className="text-[12px] text-red-500">
                  Last Name is required
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Email</Text>
              <Input
                type="email"
                // placeholder="client email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500">Email is required</p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Phone</Text>
              <Input type="tel" {...register('phone')} />
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Accommodation</Text>
              <Input
                type="text"
                placeholder="Accommodation"
                {...register('accommodation', { required: true })}
              />
              {errors.accommodation && (
                <p className="text-[12px] text-red-500">
                  Accommodation is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Billing Address</Text>
              <Input
                type="text"
                placeholder="Billing Address"
                {...register('billingAddress', { required: true })}
              />
              {errors.billingAddress && (
                <p className="text-[12px] text-red-500">
                  Billing Address is required
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Arrival Date</Text>
              <Input
                type="date"
                placeholder="Arrival Date"
                {...register('arrivalDate', { required: true })}
              />
              {errors.arrivalDate && (
                <p className="text-[12px] text-red-500">
                  Arrival Date is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Departure Date</Text>
              <Input
                type="date"
                placeholder="Departure Date"
                {...register('departureDate', { required: true })}
              />
              {errors.departureDate && (
                <p className="text-[12px] text-red-500">
                  Departure Date is required
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Passport Number</Text>
              <Input
                type="text"
                placeholder="Passport Number"
                {...register('passportNumber', { required: true })}
              />
              {errors.passportNumber && (
                <p className="text-[12px] text-red-500">
                  Passport Number is required
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Passport Document (pdf or image)</Text>
              <Input
                type="text"
                placeholder="Passport Document"
                {...register('passportAttachmentUrl', { required: true })}
              />
              {errors.passportAttachmentUrl && (
                <p className="text-[12px] text-red-500">
                  Passport Document is required
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <Text>Package</Text>
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

              {errors.password && (
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
