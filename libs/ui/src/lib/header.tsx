'use client';

import React from 'react';
import MenuBar from './menu-bar';
import { Link } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import { Text } from '@magnetic/ui';
import { BsLayoutSidebarInset } from 'react-icons/bs';

export interface HeaderProps {
  className?: string;
  children?: React.ReactElement;
  isSidebarVisible?: boolean;
  toggleSidebar: () => void;
  pageTitle?: string;
}

export function HeaderApp(props: HeaderProps) {
  const {
    className,
    children,
    isSidebarVisible = true,
    toggleSidebar,
    pageTitle,
  } = props;

  return (
    <div
      className={`bg-base-100 sticky top-0 left-0 right-0 z-10 shadow-sm  transition-all duration-300 ${
        isSidebarVisible ? 'ml-[260px] lg:w-[calc(100%-260px)]' : 'ml-0 w-full'
      } ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-6 py-4 lg:py-2 relative flex justify-between items-center">
          <div className="flex justify-start flex-1 items-center gap-[15px]">
            <div className="flex gap-3">
              {!isSidebarVisible && (
                <button
                  type="button"
                  className="collapse-icon"
                  onClick={toggleSidebar}
                >
                  <BsLayoutSidebarInset size={20} className="" />
                </button>
              )}
              {pageTitle && (
                <div className="flex flex-col">
                  <h2 className="text-2xl">{pageTitle}</h2>
                  {/* <Text size="1" className="text-gray-500">
                Manage and view all your users here.
              </Text> */}
                </div>
              )}
            </div>
            {/* {!isSidebarVisible && (
              <>
                <Link
                  to="/dashboard"
                  className="main-logo flex items-center shrink-0"
                >
                  <h5 className="text-xl pl-[2px]">Magnetic Travel</h5>
                </Link>
              </>
            )} */}
          </div>
          <div className="flex xl:hidden items-center">
            <div className="px-0.5" />
            <MenuBar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
