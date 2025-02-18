'use client';

import React from 'react';
import MenuBar from './menu-bar';
import { Link, NavLink } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
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
  const {
    className,
    children,
    isSidebarVisible = true,
    toggleSidebar,
    pageTitle,
  } = props;

  return (
    <div
      className={`bg-base-100 sticky top-0 left-0 right-0 z-20 shadow-sm lg:ml-0 w-full ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-6 py-4 lg:py-2 relative flex items-center">
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
                  className="cursor-pointer flex items-center w-full rounded-md hover:bg-base-200 "
                >
                  <NavLink
                    to={option.url || ''}
                    className={({ isActive }) =>
                      `w-full group flex items-center px-3 py-2 gap-3 ${
                        isActive
                          ? 'text-primary-500 bg-base-100 rounded-md'
                          : ''
                      }`
                    }
                  >
                    <Text className="font-light" size="1">
                      {option.text}
                    </Text>
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

const renderIcon = (IconComponent: React.ElementType | undefined) => {
  if (!IconComponent) return null;
  return <IconComponent size={18} />;
};
