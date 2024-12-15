import { Button, CardWrapper, DrawerContent } from '@magnetic/ui';
import AdminUsersTable from '../../components/users/admin-users-table';
import { useState } from 'react';
import FormUser from '../../components/users/form-user';
import FormAdminUser from '../../components/users/form-admin-user';
import { User } from '@magnetic/interfaces';

interface Props {}

export function AdminUsersPage(props: Props) {
  const {} = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
  };

  return (
    <>
      <CardWrapper className="p-6">
        <div className="header flex justify-between items-start mb-6 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Admin Users</h2>
            <p className="text-sm text-gray-500 mt-[8px]">
              Users with full access to system.
            </p>
          </div>
          <Button
            onClick={toggleDrawer}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            + New User
          </Button>
        </div>
        <AdminUsersTable
          onClickEdit={(user) => {
            setSelectedUser(user);
            toggleDrawer();
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
          user={selectedUser}
          onSaveSuccess={() => {
            toggleDrawer();
          }}
        />
      </DrawerContent>
    </>
  );
}

export default AdminUsersPage;
