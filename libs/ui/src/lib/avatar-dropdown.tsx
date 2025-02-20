import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';

import { Text } from '@magnetic/ui';
import { Fragment } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Avatar from './avatar';
import { User } from '@magnetic/interfaces';

interface DropdownOption {
  name: string;
  href?: string;
  icon?: React.ElementType;
  onClick?: () => void;
}

export function AvatarDropdown({
  logout,
  user,
  options = [],
  showInformation,
  bgAvatar
}: {
  logout?: () => void;
  user: User;
  options: DropdownOption[];
  showInformation?: true;
  bgAvatar?: string;
}) {
  return (
    <div className="AvatarDropdown">
      <Popover className="relative">
        {({ open }) => (
          <>
            <PopoverButton
              className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <div className="flex gap-3 items-center">
                <Avatar bgColor={bgAvatar} userName={user.name} size="sm" />
                {showInformation && (
                  <div className="hidden lg:flex flex-col items-start">
                    <Text size="1">{user.name ?? 'N/A'}</Text>
                    <Text size="1" className="text-gray-500">
                      {user.email}
                    </Text>
                  </div>
                )}
              </div>
            </PopoverButton>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute z-10 w-screen max-w-[190px] lg:max-w-[220px] lg:px-4 mt-4 right-[-15px] lg:right-[-20px] sm:right-0 sm:px-0">
                <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-6">
                    {options.map((item, index) => (
                      <a
                        key={index}
                        href={item.href || '#'}
                        onClick={item.onClick}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                          {item.icon && (
                            <item.icon aria-hidden="true" className="w-4 h-4" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium">{item.name}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />
                  <div className="relative grid gap-6 bg-white dark:bg-neutral-800 p-6">
                    <div className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                        <FiLogOut className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="ml-4 cursor-pointer" onClick={logout}>
                        <p className="text-sm font-medium text-red-500">
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
export default AvatarDropdown;
