import { usePackages } from '../../hooks/usePackages';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormUser from '../../components/users/form-user';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';

interface Props {}

function EditUserPage(props: Props) {
  const {} = props;
  const params = useParams();
  const userId = parseInt(params.id || '');
  const navigate = useNavigate();

  const { isLoading, isError, user, error } = useUser(userId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div>
      <FormUser
        user={user}
        onSaveSuccess={() => {
          navigate('/clients', { replace: true });
        }}
      />
    </div>
  );
}

export default EditUserPage;
