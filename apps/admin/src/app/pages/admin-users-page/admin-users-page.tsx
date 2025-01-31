import { Button, CardWrapper, DrawerContent } from '@magnetic/ui';
import AdminUsersTable from '../../components/users/admin-users-table';
import { useState } from 'react';
import FormAdminUser from '../../components/users/form-admin-user';
import { User } from '@magnetic/interfaces';
import { useUsers } from '../../hooks/useUsers';
interface Props {}

export function AdminUsersPage(props: Props) {
  const {} = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const { refetch } = useUsers({
    searchText: undefined,
    itemsPerPage: 10,
    role: 'admin',
  });

  const toggleDrawer = (user?: User) => {
    setSelectedUser(user);
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <CardWrapper className="p-6">
        <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Admin Users</h2>
            <p className="text-sm text-gray-500 mt-[8px]">
              Users with full access to system.
            </p>
          </div>
          <div className="flex justify-end lg:w-auto w-full">
            <Button
              onClick={() => toggleDrawer()}
              className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              + New User
            </Button>
          </div>
        </div>
        <AdminUsersTable
          onClickEdit={(user) => {
            toggleDrawer(user);
          }}
          onClickRemove={(user) => {
            setSelectedUser(user);
          }}
        />
      </CardWrapper>
      <DrawerContent
        title={selectedUser ? 'Edit Admin User' : 'New Admin User'}
        open={openDrawer}
        onClose={() => {
          toggleDrawer();
          // setSelectedVariant(undefined);
        }}
      >
        <FormAdminUser
          onCancel={() => {
            toggleDrawer();
          }}
          user={selectedUser}
          onSaveSuccess={() => {
            toggleDrawer();
            refetch();
          }}
        />
      </DrawerContent>
    </>
  );
}

export default AdminUsersPage;
