import { CardWrapper } from '@magnetic/ui';

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

  return (
    <>
      <CardWrapper>
        <>
          <div className="header flex justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2>Users</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ID
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Email
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Date Created
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                      {user.dateCreated}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-gray-700">
                      {user.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      </CardWrapper>
    </>
  );
}

export default UsersPage;
