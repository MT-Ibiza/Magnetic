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
      className={`bg-base-100 sticky top-0 left-0 right-0 z-20 shadow-sm  transition-all duration-300 ${
        isSidebarVisible
          ? 'lg:ml-[260px] lg:w-[calc(100%-260px)]'
          : 'lg:ml-0 w-full'
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
                  <h2 className="lg:block hidden text-2xl">{pageTitle}</h2>
                </div>
              )}
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
