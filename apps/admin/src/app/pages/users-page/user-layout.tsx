import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useUsersStore } from '../../hooks/useUsersStore';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { Avatar } from '@magnetic/ui';
import { FiMail, FiPhone, FiPackage } from 'react-icons/fi';

export function UserLayout() {
  const { id } = useParams();
  const userId = parseInt(id || '');
  const { isLoading, isError, user, data, refetch, error } = useUser(userId);
  const { currentProfileUser, setCurrentProfileUser, hasCurrentProfileUser } =
    useUsersStore();

  useEffect(() => {
    if (user) {
      setCurrentProfileUser(user);
    }
  }, [data]);

  console.log(user);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <>
      {hasCurrentProfileUser && (
        <div className="grid grid-cols-3 gap-x-[20px]">
          <div className="bg-base-100 w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
            <Avatar
              hasCheckedClass="w-6 h-6 -top-0.5 right-2"
              sizeClass="w-28 h-28"
            />
            <div className="space-y-3 text-center flex flex-col items-center">
              <h2 className="text-3xl font-semibold">
                {currentProfileUser.name}
              </h2>
            </div>
            <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <FiMail className="h-6 w-6 text-neutral-400" />
                <span className="text-neutral-6000 dark:text-neutral-300">
                  {user?.email}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <FiPhone className="h-6 w-6 text-neutral-400" />
                <span className="text-neutral-6000 dark:text-neutral-300">
                  5932902000
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <FiPackage className="h-6 w-6 text-neutral-400" />
                <span className="text-neutral-6000 dark:text-neutral-300">
                  {user?.package ? user.package.name : 'none'}
                </span>
              </div>
            </div>
          </div>
          <div className="panel lg:col-span-2 xl:col-span-3">
            <h1></h1>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLayout;
