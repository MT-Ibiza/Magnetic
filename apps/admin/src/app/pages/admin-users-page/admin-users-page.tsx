import { Button, CardWrapper } from '@magnetic/ui';
import AdminUsersTable from '../../components/users/admin-users-table';

interface Props {}

export function AdminUsersPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex justify-between items-start mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Admin Users</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Users with full access to system.
          </p>
        </div>
        <Button
          href={'/users/new'}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          + New Account
        </Button>
      </div>
      <AdminUsersTable />
    </CardWrapper>
  );
}

export default AdminUsersPage;
