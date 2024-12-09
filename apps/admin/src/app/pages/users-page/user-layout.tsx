import { NavLink, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { useUsersStore } from '../../hooks/useUsersStore';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { Avatar } from '@magnetic/ui';
import { FiMail, FiPhone, FiPackage } from 'react-icons/fi';
import { Tab, TabGroup, TabList } from '@headlessui/react';

export function UserLayout() {
  const { id } = useParams();
  const userId = parseInt(id || '');
  const { isLoading, isError, user, data, refetch, error } = useUser(userId);
  const { currentProfileUser, setCurrentProfileUser, hasCurrentProfileUser } =
    useUsersStore();

  const routes = ['overview', 'products'];
  let path = location.pathname;
  const currentRoute = path.split('/').pop();
  const index = routes.indexOf(currentRoute || '');
  const [selectedIndexTab, setSelectedIndexTab] = useState(index);

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
          <div className="block flex-grow mb-24 lg:mb-0">
            <div className="lg:sticky lg:top-24">
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
            </div>
          </div>
          <div className="col-span-2">
            <div className="bg-base-100 listingSection__wrap">
              <div>
                <h2 className="text-2xl font-semibold">
                  {currentProfileUser.name} listings
                </h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {currentProfileUser.name} listings is very rich, 5 star
                  reviews help him to be more branded.
                </span>
              </div>
              <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
              <div>
                <TabGroup>
                  <TabList className="flex space-x-1 overflow-x-auto">
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <NavLink
                          to="/"
                          onClick={() => {
                            setSelectedIndexTab(0);
                          }}
                          className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                            selected
                              ? 'bg-secondary-900 text-secondary-50 '
                              : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          } `}
                        >
                          Services
                        </NavLink>
                      )}
                    </Tab>
                  </TabList>
                </TabGroup>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserLayout;
