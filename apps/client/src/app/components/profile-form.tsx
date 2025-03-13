import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button, Input, Text } from '@magnetic/ui';
import { toast } from 'sonner';

import { User, UserBase } from '@magnetic/interfaces';
import { useState } from 'react';
import { editClient } from '../apis/api-client';
import { useNavigate } from 'react-router-dom';
import { TODAY_DATE } from '../constants';

export interface ProfileFormData {
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
  companyName?: string;
}

export interface Props {
  user: UserBase;
}

export function ProfileForm(props: Props) {
  const { user } = props;
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: user
      ? {
          email: user.email,
          phone: user.phone,
          password: undefined,
          packageId: user.packageId,
          firstName: user.firstName,
          lastName: user.lastName,
          accommodation: user.accommodation,
          arrivalDate: user.arrivalDate
            ? new Date(user.arrivalDate).toISOString().split('T')[0]
            : '',
          departureDate: user.departureDate
            ? new Date(user.departureDate).toISOString().split('T')[0]
            : '',
          passportNumber: user.passportNumber,
          passportAttachmentUrl: user.passportAttachmentUrl,
          billingAddress: user.billingAddress,
          companyName: user.companyName,
        }
      : undefined,
  });

  const updateClient = useMutation<UserBase, Error, FormData>({
    mutationFn: (data) => {
      return editClient(data);
    },
    onSuccess: (user) => {
      toast.success('Account Updated!');
      setIsSaving(false);
      navigate(`/dashboard`);
    },
    onError: (error) => {
      toast.error('The account could not be updated');
      setIsSaving(false);
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phone', data.phone || '');
    formData.append('accommodation', data.accommodation);
    formData.append('arrivalDate', new Date(data.arrivalDate).toISOString());
    formData.append(
      'departureDate',
      new Date(data.departureDate).toISOString()
    );
    formData.append('passportNumber', data.passportNumber);
    formData.append('billingAddress', data.billingAddress);
    data.password && formData.append('password', data.password);
    data.companyName && formData.append('companyName', data.companyName);
    formData.append('packageId', String(data.packageId));
    if (passportFile) {
      formData.append('passportAttachmentUrl', passportFile);
    }
    await updateClient.mutateAsync(formData);
  };

  const handlePassportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
        alert('Please upload a valid PDF or image file.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB.');
        return;
      }
      setPassportFile(file);
    }
  };

  return (
    <div className="bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div className="flex lg:flex-row flex-col gap-5">
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
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Phone</Text>
              <Input type="tel" placeholder="Phone" {...register('phone')} />
            </div>
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
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Arrival Date</Text>
              <Input
                type="date"
                min={TODAY_DATE}
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
                min={TODAY_DATE}
                {...register('departureDate', { required: true })}
              />
              {errors.departureDate && (
                <p className="text-[12px] text-red-500">
                  Departure Date is required
                </p>
              )}
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Company Name</Text>
              <Input type="text" {...register('companyName')} />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Text>Passport/Company Number</Text>
              <Input
                type="text"
                placeholder="Passport Number"
                {...register('passportNumber')}
              />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="flex flex-col gap-2 w-full">
              <Text>Billing Address</Text>
              <Input
                type="text"
                placeholder="Billing Address"
                {...register('billingAddress')}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text>Email</Text>
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-[12px] text-red-500">Email is required</p>
              )}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div>
              <label className="flex flex-col">
                <div className="flex gap-[10px] items-center">
                  <span className="text-neutral-800 dark:text-neutral-200">
                    Upload Passport
                  </span>
                  <p className="text-sm text-neutral-500">
                    (Maximum file size: 5MB)
                  </p>
                </div>
                <div className="mt-3 cursor-pointer p-4 border border-neutral-300 rounded-lg shadow-sm flex justify-between gap-4">
                  {user?.passportAttachmentUrl && !passportFile && (
                    <div className="flex items-center gap-3">
                      {user.passportAttachmentUrl.endsWith('.pdf') ? (
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-3 bg-gray-50 shadow-sm">
                          <i className="fas fa-file-pdf text-red-500"></i>
                          <a
                            href={user.passportAttachmentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline text-sm"
                          >
                            View Passport (PDF)
                          </a>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={user.passportAttachmentUrl}
                            alt="Uploaded Passport"
                            className="object-cover w-[100px] h-[100px] rounded-lg shadow-sm border"
                          />
                          <span className="absolute top-0 right-0 text-white bg-black rounded-full p-1 text-xs">
                            Image
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  {passportFile && (
                    <div className="flex items-center gap-3">
                      {passportFile.type === 'application/pdf' ? (
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-3 bg-gray-50 shadow-sm">
                          <i className="fas fa-file-pdf text-red-500"></i>
                          <span className="text-sm">{passportFile.name}</span>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(passportFile)}
                            alt="New Passport"
                            className="object-cover w-[100px] h-[100px] rounded-lg shadow-sm border"
                          />
                          <span className="absolute top-0 right-0 text-white bg-black rounded-full p-1 text-xs">
                            Image
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="hidden"
                      id="passport-file"
                      onChange={handlePassportChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById('passport-file')?.click()
                      }
                    >
                      Upload New Passport
                    </Button>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-[10px] justify-end pt-[40px] lg:pt-[80px]">
          <Button
            variant="outline"
            href={'/dashboard'}
            type="submit"
            color="neutral"
          >
            Cancel
          </Button>
          <Button loading={isSaving} type="submit">
            Update Account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
