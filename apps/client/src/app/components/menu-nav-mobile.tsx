import React from 'react';
import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { NavItemType } from './menu-item-nav';
import { NAVIGATION_DEMO } from '../data-nav-menu';

export interface NavMobileProps {
  data?: NavItemType[];
  onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
  data = NAVIGATION_DEMO,
  onClickClose,
}) => {

  const _renderItem = (item: NavItemType, index: number) => {
    return (
      <Disclosure
        key={item.id}
        as="li"
        className="text-neutral-900 dark:text-white"
      >
        <NavLink
          end
          className={({ isActive }) =>
            `flex w-full px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg ${
              isActive ? 'text-secondary' : ''
            }`
          }
          to={{
            pathname: item.href || undefined,
          }}
        >
          <span
            className={`py-2.5 pr-3 ${!item.children ? 'block w-full' : ''}`}
          >
            {item.name}
          </span>
        </NavLink>
      </Disclosure>
    );
  };

  return (
    <div className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <NavLink
          to="/dashboard"
          className="main-logo flex items-center shrink-0 gap-2"
        >
          <img className="w-24" src={'/icons/logo-app-trim.png'} alt="Logo" />
        </NavLink>
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <button
            onClick={onClickClose}
            className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            <HiX className="w-6 h-6 text-neutral-900 dark:text-neutral-200" />
          </button>
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {data.map(_renderItem)}
      </ul>
    </div>
  );
};

export default NavMobile;
