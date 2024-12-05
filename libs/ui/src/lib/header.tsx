import React from 'react';
import MenuBar from './menu-bar';

export interface HeaderProps {
  className?: string;
  children?: React.ReactElement;
}

export function HeaderApp(props: HeaderProps) {
  const { className, children } = props;

  return (
    <div
      className={`sticky ml-[18rem] mr-0 lg:w-[calc(100%-18rem)] nc-Header relative top-0 w-full left-0 right-0 z-40 nc-header-bg shadow-sm dark:border-b dark:border-neutral-700 ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-[30px] py-4 lg:py-2 relative flex justify-between items-center">
          <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10"></div>
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
