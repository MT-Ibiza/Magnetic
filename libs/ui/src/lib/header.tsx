import React, { FC } from 'react';
// import MainNav1 from "./MainNav1";

export interface HeaderProps {
  className?: string;
}

export function HeaderApp(props: HeaderProps) {
const { className } = props;

  return (
    <div
      className={`nc-Header sticky top-0 w-full left-0 right-0 z-40 nc-header-bg ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-4 lg:container py-4 lg:py-5 relative flex justify-between items-center">
          <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
            <img
              src={'/images/logo-app.svg'}
              alt="Logo"
              className="h-[24px] w-[100px] lg:h-[46px] lg:w-[191px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderApp;
