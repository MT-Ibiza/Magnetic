import { LoginForm } from '@magnetic/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { Credentials, LoginResponse } from '@magnetic/interfaces';
import { login } from '../../apis/auth-api';

export function LoginPage() {
  const [error, setError] = useState('');
  const { setToken, setLoggedIn, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const mutation = useMutation<LoginResponse, Error, Credentials>({
    mutationFn: (formData) => {
      return login(formData);
    },
  });

  async function onSubmitForm(data: { email: string; password: string }) {
    setIsSaving(true);

    try {
      const user = await mutation.mutateAsync(data);
      setCurrentUser({
        name: user.name,
        email: user.email,
        id: user.id,
      });
      setToken(user.accessToken);
      setLoggedIn(true);
      setIsSaving(false);
      navigate('/');
    } catch (err: any) {
      setError('Password or email incorrect');
      setIsSaving(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {error && (
        <p className="text-lg text-red-500 p-3 rounded mb-2">{error}</p>
      )}
      <img className="w-[250px]" src={'/icons/logo-app-black.png'} alt="Logo" />
      <LoginForm onSubmit={onSubmitForm} isSaving={isSaving} />
    </div>
  );
}

export default LoginPage;
