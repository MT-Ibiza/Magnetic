import React from 'react';
import { usePackages } from '../../hooks/usePackages';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormUser from '../../components/users/form-user';

interface Props {}

function NewUserPage(props: Props) {
  const {} = props;
  const { isLoading, isError, packages, error } = usePackages();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div>
      <FormUser packages={packages} />
    </div>
  );
}

export default NewUserPage;
