import { CardWrapper } from '@magnetic/ui';
import UsersTable from '../../components/users/users-table';

interface User {
  id: number;
  name: string;
  email: string;
  dateCreated: string;
  type: string;
}

export function UsersPage() {
  const users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      dateCreated: '2022-01-15',
      type: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      dateCreated: '2023-03-22',
      type: 'Client',
    },
    {
      id: 3,
      name: 'Gary Barlow',
      email: 'gary.barlow@example.com',
      dateCreated: '2021-11-30',
      type: 'Admin',
    },
  ];

  return <UsersTable />;
}

export default UsersPage;
