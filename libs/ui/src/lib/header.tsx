import AvatarDropdown from './avatar-dropdown';
import MenuBar from './menu-bar';
import { Link } from 'react-router-dom';

export interface HeaderProps {
  className?: string;
}

export function HeaderApp(props: HeaderProps) {
  const { className } = props;

  return (
    <div
      className={`ml-[18rem] mr-0 lg:w-[calc(100%-18rem)] nc-Header relative top-0 w-full left-0 right-0 z-40 nc-header-bg shadow-sm dark:border-b dark:border-neutral-700 ${className}`}
    >
      <div className={`nc-MainNav1 relative z-10 ${className}`}>
        <div className="px-[30px] py-4 lg:py-2 relative flex justify-between items-center">
          <div className="hidden md:flex justify-start flex-1 items-center space-x-4 sm:space-x-10">
          </div>
          <div className="flex xl:hidden items-center">
            <div className="px-0.5" />
            <MenuBar />
          </div>
          <AvatarDropdown />
        </div>
      </div>
    </div>
  );
}

export default HeaderApp;
