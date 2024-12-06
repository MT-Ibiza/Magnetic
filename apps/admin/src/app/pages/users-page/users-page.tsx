import { Button, CardWrapper, Text } from '@magnetic/ui';
import UsersTable from '../../components/users/users-table';

interface User {
  id: number;
  name: string;
  email: string;
  dateCreated: string;
  type: string;
}

export function UsersPage() {
  return (
    <CardWrapper>
      <div className="header flex justify-between mb-8">
        <div className="flex flex-col gap-1">
          <Text size="4">Users</Text>
        </div>
        <div>
          <Button href={'/users/new'}>+ Add User</Button>
        </div>
      </div>
      <UsersTable />
    </CardWrapper>
  );
}

export default UsersPage;
