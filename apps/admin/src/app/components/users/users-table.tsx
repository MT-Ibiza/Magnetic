import Loading from '../loading';
import { ErrorText } from '../error-text';
import { useUsers } from '../../hooks/useUsers';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { User } from '@magnetic/interfaces';
import { Avatar, Button, Text } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils';
import ConfirmAlert from '../confirm-alert';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { removeUser } from '../../apis/api-users';

interface Props {
  onClickEdit?: (user: User) => void;
  onClickRemove?: (user: User) => void;
}

function UsersTable(props: Props) {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [showAlert, setShowAlert] = useState(false);
  const { getCurrentUser, logout } = useAuth();
  const currentUser = getCurrentUser();
  const toggleAlert = () => {
    setShowAlert((prevState) => !prevState);
  };
  const {
    isLoading,
    isError,
    users,
    error,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useUsers({
    searchText: undefined,
    itemsPerPage: 10,
    role: 'client',
  });

  const removeAdminUser = useMutation<User, Error, any>({
    mutationFn: (userId: number) => {
      return removeUser(userId);
    },
    onSuccess: () => {
      if (currentUser?.id === selectedUser?.id) {
        toggleAlert();
        logout();
      } else {
        toggleAlert();
        refetch();
      }
    },
    onError: (error) => {
      console.log('error: ', error);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Accommodation</th>
            <th>Arrival Date</th>
            <th>Package</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="hover" key={index}>
              <td>
                <div className="flex gap-3">
                  <Link to={`/clients/${user.id}`}>
                    <Avatar size="sm" userName={user.name} />
                  </Link>
                  <div className="flex flex-col gap-1">
                    <Link to={`/clients/${user.id}`}>{user.name}</Link>
                    <Text size="1" className="text-gray-400">
                      {user.email}
                    </Text>
                  </div>
                </div>
              </td>
              <td>
                <Text size="1">{user.accommodation || 'N/A'}</Text>
              </td>
              <td>
                <Text size="1">{formatDate(user.arrivalDate)}</Text>
                {/* <div className="flex flex-col gap-1">
                  <Text size="1">{user.phone || 'N/A'}</Text>
                  <Text size="1" className="text-gray-400">
                    {user.email}
                  </Text>
                </div> */}
              </td>
              <td>{user.package ? user.package.name : 'none'}</td>
              <td>
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="m-1">
                    <HiOutlineDotsVertical />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <a href={`/clients/edit/${user.id}`}>Edit</a>
                    </li>
                    <li
                      onClick={() => {
                        setSelectedUser(user);
                        toggleAlert();
                      }}
                    >
                      <a>Delete</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasNextPage && (
        <div className="text-center">
          <Button
            className="text-center m-5 bg-primary hover:bg-primary-800"
            variant="solid"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load More Results
          </Button>
        </div>
      )}

      <ConfirmAlert
        title={'Remove User'}
        message={`Are you sure you want to remove ${selectedUser?.name} account?`}
        show={showAlert}
        onClickConfirm={async () => {
          if (selectedUser) {
            await removeAdminUser.mutateAsync(selectedUser.id);
          }
        }}
        onClickCancel={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
}

export default UsersTable;
