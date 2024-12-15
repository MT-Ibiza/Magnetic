import React from 'react';
import { usePackages } from '../../hooks/usePackages';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import FormUser from '../../components/users/form-user';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@magnetic/ui';
import { toast } from 'sonner';

interface Props {}

function NewUserPage(props: Props) {
  const {} = props;
  const navigate = useNavigate();

  function showToast() {
    // toast.custom((t) => (
    //   <div className="bg-green-200 text-white ">
    //     <h1>New Account Created!</h1>
    //   </div>
    // ));
    // toast('New Account Created!');
  }

  return (
    <div>
      {/* <Button onClick={showToast}>show toast</Button> */}
      <div className="flex flex-col gap-1 mb-5">
        <h2 className="text-xl">New Account</h2>
        <Text className="text-gray-500" size="1">
          The email provided will be used to send important communications,
          including booking confirmations and payment receipts.
        </Text>
      </div>
      <FormUser
        onSuccess={() => {
          navigate('/users', { replace: true });
        }}
      />
    </div>
  );
}

export default NewUserPage;
