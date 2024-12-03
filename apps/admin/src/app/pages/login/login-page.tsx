import { LoginForm } from '@magnetic/ui';

export function LoginPage() {

  function onSubmitForm(data: { email: string; password: string }) {
    console.log(data);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm onSubmit={onSubmitForm} />
    </div>
  );
}

export default LoginPage;
