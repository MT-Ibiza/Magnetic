import Loading from '../loading';
import { ErrorText } from '../error-text';
import { useUsers } from '../../hooks/useUsers';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { User } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { Link } from 'react-router-dom';

interface Props {
  onClickEdit?: (user: User) => void;
  onClickRemove?: (user: User) => void;
}

function UsersTable(props: Props) {
  const { onClickEdit, onClickRemove } = props;
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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Subscription</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>
                <Link to={`/clients/${user.id}`}>
                  <Text>{user.name}</Text>
                </Link>
              </td>
              <td>
                <div className="flex flex-col gap-1">
                  <Text size="1">{user.phone || 'N/A'}</Text>
                  <Text size="1" className="text-gray-400">
                    {user.email}
                  </Text>
                </div>
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
                        onClickRemove && onClickRemove(user);
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
    </div>
  );
}

export default UsersTable;
