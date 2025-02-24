'use client';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Text } from '@magnetic/ui';
import { FaUserFriends, FaBook } from 'react-icons/fa';
import { SiTask } from 'react-icons/si';
import { MdDashboardCustomize } from 'react-icons/md';

export interface HeaderProps {
  className?: string;
  children?: React.ReactElement;
  isSidebarVisible?: boolean;
  toggleSidebar: () => void;
  pageTitle?: string;
}

const navigation = [
  {
    text: 'Dashboard',
    key: 'dashboard',
    url: '/dashboard',
    icon: MdDashboardCustomize,
  },
  {
    text: 'Services',
    key: 'services',
    url: '/services',
    icon: SiTask,
  },
  {
    text: 'Bookings',
    key: 'bookings',
    url: '/bookings',
    icon: FaBook,
  },
  {
    text: 'Packages',
    key: 'packages',
    url: '/packages',
    icon: FaUserFriends,
  },
];

export function HeaderClient(props: HeaderProps) {
  const { className, children } = props;

  return (
    <div
      className={`hidden lg:block nc-header-bg sticky top-0 left-0 right-0 z-20 shadow-sm lg:ml-0 w-full ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
          <div className="flex gap-3">
            <NavLink
              to="/dashboard"
              className="main-logo flex items-center shrink-0 gap-2"
            >
              <img
                className="w-[80px]"
                src={'/icons/logo-app-trim.png'}
                alt="Logo"
              />
            </NavLink>
          </div>
          <div className="w-full flex justify-center px-3">
            <ul className="links flex gap-3 pr-8">
              {navigation.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center w-full"
                >
                  <NavLink
                    to={option.url || ''}
                    className={({ isActive }) =>
                      `inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 ${
                        isActive
                          ? "!font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100"
                          : ""
                      }`
                    }
                  >
                      {option.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default HeaderClient;
