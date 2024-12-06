import React from 'react';
import { useServices } from '../../hooks/useService';
import Loading from '../loading';
import { ErrorText } from '../error-text';
import { useUsers } from '../../hooks/useUsers';

interface Props {}

function UsersTable(props: Props) {
  const {} = props;
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
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>N</th>
            <th>Name</th>
            <th>Role</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr className="hover" key={index}>
              <th>{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.active ? 'Active' : 'Disabled'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
