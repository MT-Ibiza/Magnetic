'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './button';
import { CurrentUser, User } from '@magnetic/interfaces';

export interface Props {
  className?: string;
  user?: CurrentUser;
}

export function ProfileForm(props: Props) {
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.name || '',
      last_name: '',
      email: user?.email || '',
      phone: '',
      date: '',
    },
  });

  const [error, setError] = useState<any>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className={`service-form`}>
      <div className="container">
        <div className="mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-[50px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center">
              <div className="mt-2">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Imagen de perfil"
                    className="object-cover w-[120px] h-[120px] m-auto rounded-full shadow"
                    onClick={() => document.getElementById('photo')?.click()}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <div
                    className="w-[120px] h-[120px] m-auto rounded-full shadow flex justify-center items-center bg-gray-100 cursor-pointer"
                    onClick={() => document.getElementById('photo')?.click()}
                  ></div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="photo"
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                onClick={() => document.getElementById('photo')?.click()}
              >
                Upload Photo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-y-[25px] gap-x-[40px]">
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  First Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-1"
                  {...register('first_name', { required: false })}
                />
              </label>
              <label className="block flex flex-col">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Last Name
                </span>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-1"
                  {...register('last_name', { required: false })}
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
                />
                {errors.email && (
                  <p className="text-[12px] mt-1 text-red-500">
                    Email is required
                  </p>
                )}
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
                  defaultValue="1990-07-22"
                  {...register('date', { required: true })}
                />
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
