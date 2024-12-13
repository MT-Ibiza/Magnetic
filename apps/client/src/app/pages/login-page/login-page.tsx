import { LoginForm } from '@magnetic/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { Credentials, LoginResponse } from '@magnetic/interfaces';
import { login } from '../../apis/api-auth';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

export function LoginPage() {
  const [error, setError] = useState('');
  const { setToken, setLoggedIn, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mutation = useMutation<LoginResponse, Error, Credentials>({
    mutationFn: (formData) => login(formData),
    onSuccess: () => console.log('logged'),
    onError: (error) => console.log('error login', error),
  });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  async function onSubmitForm(data: Credentials) {
    try {
      const user = await mutation.mutateAsync(data);
      setCurrentUser({
        name: user.name,
        email: user.email,
        id: user.id,
        package: user.package,
      });
      setToken(user.accessToken);
      setLoggedIn(true);
      navigate('/');
    } catch (err: any) {
      setError('Password or email incorrect');
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
    <section className="min-h-screen flex items-stretch text-white">
      <div
        className="bg-[url('https://www.magnetic-travel.com/wp-content/uploads/2023/07/2-min.png')]
        lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
      >
        <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
        <div className="w-full px-24 z-10">
          <h1 className="text-5xl font-bold text-left tracking-wide">
            Magnetic Travel
          </h1>
          <p className="text-2xl mt-5">
            How can we assist you organizing the perfect Ibiza holiday?
          </p>
        </div>
        <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
              aria-label={social.label}
            >
              <div className="text-2xl">{social.icon}</div>
            </a>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center md:px-16 px-0 z-0 b-[#161616]">
        {error && (
          <p className="text-lg text-red-500 p-3 rounded mb-2">{error}</p>
        )}
        <img
          className="w-[250px]"
          src={
            isDarkMode
              ? '/icons/logo-app-white.png'
              : '/icons/logo-app-black.png'
          }
          alt="Logo"
        />
        <LoginForm onSubmit={onSubmitForm} />
      </div>
    </section>
  );
}

export default LoginPage;
