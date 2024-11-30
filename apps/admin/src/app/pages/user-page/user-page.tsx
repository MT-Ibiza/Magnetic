import { CardWrapper } from '@magnetic/ui';

export function UsersPage() {

  return (
    <>
      <CardWrapper>
        <>
          <div className="header flex justify-between mb-8">
            <div className="flex flex-col gap-1">
              <h2>Users</h2>
              <p>Manage all clients and system users</p>
            </div>
          </div>
        </>
      </CardWrapper>
    </>
  );
}

export default UsersPage;
