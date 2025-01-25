import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useClient } from '../hooks/useClient';
import { Button, Input } from '@magnetic/ui';
import { editClient } from '../apis/api-client';

export interface Props {
  className?: string;
}

export function ProfileForm(props: Props) {
  const { className } = props;
  const { client, isClientLoading, isClientError, clientError } = useClient();
  const [error, setError] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      date: '',
      accommodation: '',
      arrivalDate: '',
      departureDate: '',
      passportNumber: '',
      billingAddress: '',
      passportAttachmentUrl: '',
    },
  });

  useEffect(() => {
    if (client) {
      reset({
        firstName: client.name || '',
        lastName: client.lastName || '',
        email: client.email || '',
        phone: client.phone || '',
        // date: client.dateOfBirth || '',
        accommodation: client.accommodation || '',
        arrivalDate: client.arrivalDate ? new Date(client.arrivalDate).toISOString().split('T')[0] : '',
        departureDate: client.departureDate ? new Date(client.departureDate).toISOString().split('T')[0] : '',
        passportNumber: client.passportNumber || '',
        billingAddress: client.billingAddress || '',
        passportAttachmentUrl: client.passportAttachmentUrl || '',
      });
    }
  }, [client, reset]);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('date', data.date);
      formData.append('accommodation', data.accommodation);
      formData.append('arrivalDate', new Date(data.arrivalDate).toISOString());
      formData.append(
        'departureDate',
        new Date(data.departureDate).toISOString()
      );
      formData.append('passportNumber', data.passportNumber);
      formData.append('billingAddress', data.billingAddress);
      if (passportFile) {
        formData.append('passportAttachmentUrl', passportFile);
      }
      const updatedUser = await editClient(formData);
      console.log('Updated User:', updatedUser);
    } catch (err: any) {
      console.error('Error updating user:', err);
      setError(err.message || 'An error occurred while updating the profile');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
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

  if (isClientLoading) {
    return <p>Loading profile...</p>;
  }

  if (isClientError) {
    return (
      <p className="text-red-500">
        Error fetching profile: {clientError?.message}
      </p>
    );
  }

  return (
    <div className={`service-form ${className}`}>
      <div className="container">
        <div className="mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-[50px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center">
              <div className="mt-2">
                  <img
                    src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'}
                    alt="Imagen de perfil"
                    className="object-cover w-[120px] h-[120px] m-auto rounded-full shadow"
                    onClick={() => document.getElementById('photo')?.click()}
                  />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-[25px] gap-x-[40px]">
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-1"
                  {...register('firstName', { required: true })}
                />
                {errors.firstName && (
                  <p className="text-[12px] mt-1 text-red-500">
                    First name is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-1"
                  {...register('lastName', { required: false })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Your email
                </span>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1"
                  {...register('email', { required: true })}
                  readOnly
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Phone Number
                </span>
                <Input
                  type="number"
                  placeholder="Enter your phone number"
                  className="mt-1"
                  {...register('phone', { required: true })}
                />
                {errors.phone && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Phone is required
                  </p>
                )}
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Date of Birth
                </span>
                <Input
                  placeholder="Enter your birthdate"
                  className="mt-1"
                  type="date"
                  {...register('date', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Accommodation
                </span>
                <Input
                  type="text"
                  placeholder="Enter accommodation details"
                  className="mt-1"
                  {...register('accommodation', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Arrival Date
                </span>
                <Input
                  type="date"
                  placeholder="Enter arrival date"
                  className="mt-1"
                  {...register('arrivalDate', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Departure Date
                </span>
                <Input
                  type="date"
                  placeholder="Enter departure date"
                  className="mt-1"
                  {...register('departureDate', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Passport Number
                </span>
                <Input
                  type="text"
                  placeholder="Enter your passport number"
                  className="mt-1"
                  {...register('passportNumber', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Billing Address
                </span>
                <Input
                  type="text"
                  placeholder="Enter billing address"
                  className="mt-1"
                  {...register('billingAddress', { required: true })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Upload Passport
                </span>
                <p className="text-sm text-neutral-500 mt-2">
                  Maximum file size: 5MB
                </p>
                <div className="mt-3 cursor-pointer p-4 border border-neutral-300 rounded-lg shadow-sm flex justify-between gap-4">
                  {client?.passportAttachmentUrl && !passportFile && (
                    <div className="flex items-center gap-3">
                      {client.passportAttachmentUrl.endsWith('.pdf') ? (
                        <div className="flex items-center gap-2 border border-neutral-300 rounded-lg p-3 bg-gray-50 shadow-sm">
                          <i className="fas fa-file-pdf text-red-500"></i>
                          <a
                            href={client.passportAttachmentUrl}
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
                            src={client.passportAttachmentUrl}
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
            <div className="flex justify-end">
              <Button size={2} type="submit">
                Save changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
