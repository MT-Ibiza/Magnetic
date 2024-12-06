import React from 'react';
import MenuBar from './menu-bar';
import { Link } from 'react-router-dom';
import { MdMenu } from "react-icons/md";

export interface HeaderProps {
  className?: string;
  children?: React.ReactElement;
  isSidebarVisible?: boolean;
  toggleSidebar: () => void;
}

export function HeaderApp(props: HeaderProps) {
  const { className, children, isSidebarVisible = true, toggleSidebar } = props;

  return (
    <div
      className={`sticky top-0 left-0 right-0 z-60 shadow-sm dark:border-b dark:border-neutral-700 transition-all duration-300 ${
        isSidebarVisible ? 'ml-[260px] lg:w-[calc(100%-260px)]' : 'ml-0 w-full'
      } ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-[30px] py-4 lg:py-2 relative flex justify-between items-center">
          <div className="flex justify-start flex-1 items-center gap-[15px]">
            {!isSidebarVisible && (
              <>
                <Link
                  to="/dashboard"
                  className="main-logo flex items-center shrink-0"
                >
                  <h5 className="text-xl pl-[2px]">Magnetic Travel</h5>
                </Link>
              </>
            )}
            <button
              type="button"
              className="collapse-icon text-primary flex-none dark:text-[#d0d2d6] hover:text-primary-6000 dark:hover:text-primary flex rtl:mr-2 p-2 rounded-[10px] dark:bg-dark/40 hover:bg-primary-50 dark:hover:bg-dark/60"
              onClick={toggleSidebar}
            >
              <MdMenu size={24} />
            </button>
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
