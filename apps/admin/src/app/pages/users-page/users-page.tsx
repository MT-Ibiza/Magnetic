import { Button, CardWrapper } from '@magnetic/ui';
import UsersTable from '../../components/users/users-table';

interface Props {}

export function UsersPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex justify-between items-start mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Clients</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Manage and view all your clients here.
          </p>
        </div>
        <Button
          href={'/users/new'}
          className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          + New Account
        </Button>
      </div>
      <UsersTable />
    </CardWrapper>
  );
}

export default UsersPage;
