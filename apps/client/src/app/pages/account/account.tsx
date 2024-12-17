import { ProfileForm } from '@magnetic/ui';
import { useAuth } from '../../hooks/useAuth';

export function AccountPage() {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  return (
    <div className='bg-base-100 listingSection__wrap'>
      <ProfileForm user={user} />
    </div>
  );
}

export default AccountPage;
