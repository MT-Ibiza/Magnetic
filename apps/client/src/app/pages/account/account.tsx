import ProfileForm from '../../components/profile-form';
import { useClient } from '../../hooks/useClient';

export function AccountPage() {
  const { client, isClientLoading, isClientError, clientError } = useClient();

  return (
    <div className="bg-base-100 listingSection__wrap">
      {client && <ProfileForm user={client} />}
    </div>
  );
}

export default AccountPage;
