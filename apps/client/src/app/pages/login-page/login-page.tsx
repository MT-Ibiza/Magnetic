import { LoginForm } from '@magnetic/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { Credentials, LoginResponse } from '@magnetic/interfaces';
import { login } from '../../apis/api-auth';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export function LoginPage() {
  const [error, setError] = useState<string>();
  const { setToken, setLoggedIn, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const loginMutation = useMutation<LoginResponse, Error, Credentials>({
    mutationFn: (formData) => login(formData),
    onSuccess: () => console.log('logged'),
    onError: (error) => console.log('error login', error),
  });

  async function onSubmitForm(data: Credentials) {
    setIsSaving(true);
    setError(undefined);
    try {
      const user = await loginMutation.mutateAsync(data);
      setCurrentUser({
        name: user.name,
        email: user.email,
        arrivalDate: user.arrivalDate,
        accommodation: user.accommodation,
        package: user.package,
        phone: user.phone,
        cartId: user.cartId,
        id: user.id,
      });
      setIsSaving(false);
      setToken(user.accessToken);
      setLoggedIn(true);
      navigate('/');
    } catch (err: any) {
      setError('Password or email incorrect');
      setIsSaving(false);
    }
  }

  const socialLinks = [
    { href: 'https://twitter.com/', icon: <FaTwitter />, label: 'Twitter' },
    { href: 'https://facebook.com/', icon: <FaFacebook />, label: 'Facebook' },
    {
      href: 'https://instagram.com/',
      icon: <FaInstagram />,
      label: 'Instagram',
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* <div
        className="bg-[url('/images/cover-image-login.jpg')] lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
      >
        <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
      </div> */}
      <div className="w-full h-full flex flex-col items-center justify-center md:px-16 px-0 z-0 b-[#161616]">
        {error && (
          <p className="text-lg text-red-500 p-3 rounded mb-2">{error}</p>
        )}
        <img
          className="w-[200px] pb-[40px]"
          src={'/icons/logo-no-bg.png'}
          alt="Logo"
        />
        <LoginForm onSubmit={onSubmitForm} isSaving={isSaving} />
      </div>
    </div>
  );
}

export default LoginPage;
