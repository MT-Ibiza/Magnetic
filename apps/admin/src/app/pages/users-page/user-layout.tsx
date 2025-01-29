import { Link, useParams } from 'react-router-dom';
import { Fragment, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { Avatar } from '@magnetic/ui';
import { FiMail, FiPhone, FiPackage, FiEdit } from 'react-icons/fi';
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from '@headlessui/react';
import { BookingsUser } from '../../components/bookings/bookings-user';
import { InformationProfile } from '../../components/users/information-profile';

export function UserLayout() {
  const { id } = useParams();
  const userId = parseInt(id || '');
  const { isLoading, isError, user, bookings, data, refetch, error } =
    useUser(userId);

  const routes = ['general-information'];
  let path = location.pathname;
  const currentRoute = path.split('/').pop();
  const index = routes.indexOf(currentRoute || '');
  const [selectedIndexTab, setSelectedIndexTab] = useState(
    index >= 0 ? index : 0
  );
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <>
      {user && (
        <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-[20px]">
          <div className="block flex-grow mb-4 lg:mb-0">
            <div className="lg:sticky lg:top-20 relative">
              <div className="bg-base-100 w-full flex flex-col items-center text-center rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 p-6 xl:p-8">
                <Avatar
                  userName={
                    `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
                    user.name
                  }
                  hasCheckedClass="w-6 h-6 -top-0.5 right-2"
                  size="xl"
                />
                <div className="space-y-3 text-center flex flex-col items-center">
                  <h2 className="text-2xl lg:text-2xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                </div>
                <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <FiMail className="h-6 w-6 text-neutral-400" />
                    <span className="lg:text-[16px] text-[14px] text-neutral-6000 dark:text-neutral-300">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiPhone className="h-6 w-6 text-neutral-400" />
                    <span className="lg:text-[16px] text-[14px] text-neutral-6000 dark:text-neutral-300">
                      {user.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FiPackage className="h-6 w-6 text-neutral-400" />
                    <span className="lg:text-[16px] text-[14px] text-neutral-6000 dark:text-neutral-300">
                      {user.package ? user.package.name : 'None'}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/clients/edit/${user.id}`}
                  className="absolute top-4 right-4 text-primary-600 hover:text-primary-800"
                >
                  <FiEdit className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <section className="col-span-2">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm p-6">
              <TabGroup
                selectedIndex={selectedIndexTab}
                onChange={setSelectedIndexTab}
              >
                <TabList className="flex space-x-1 overflow-x-auto mb-6 border-b border-neutral-200 dark:border-neutral-700 pb-2">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`block px-5 py-2 text-sm sm:text-base font-medium capitalize rounded-t-md ${
                          selected
                            ? 'text-secondary-900 dark:text-white border-b-2 border-secondary-500'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        General Information
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`block px-5 py-2 text-sm sm:text-base font-medium capitalize rounded-t-md ${
                          selected
                            ? 'text-secondary-900 dark:text-white border-b-2 border-secondary-500'
                            : 'text-neutral-500 dark:text-neutral-400'
                        }`}
                      >
                        Bookings
                      </button>
                    )}
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <InformationProfile user={user} />
                  </TabPanel>
                  <TabPanel>
                    <div className="p-2 grid grid-cols-1 sm:grid-cols-1 gap-6">
                      <div>
                        {bookings && bookings.length > 0 ? (
                          <BookingsUser bookings={bookings} />
                        ) : (
                          <p className="mt-2 text-neutral-500 dark:text-neutral-300">
                            No bookings found for this user.
                          </p>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default UserLayout;
