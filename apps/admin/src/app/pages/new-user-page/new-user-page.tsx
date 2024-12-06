import React from 'react';
import { usePackages } from '../../hooks/usePackages';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormUser from '../../components/users/form-user';

interface Props {}

function NewUserPage(props: Props) {
  const {} = props;

  return (
    <div>
      <FormUser />
    </div>
  );
}

export default NewUserPage;
