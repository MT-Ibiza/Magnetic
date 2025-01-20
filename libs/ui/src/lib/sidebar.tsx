'use client';

import { NavLink } from 'react-router-dom';
import Text from './text';
import { BsLayoutSidebarInsetReverse } from 'react-icons/bs';

interface SidebarSingleOption {
  text: string;
  url?: string;
  icon?: React.ElementType;
}

interface SidebarOption {
  text: string;
  url?: string;
  icon?: React.ElementType;
  options?: SidebarSingleOption[];
}

interface SidebarProps {
  options: SidebarOption[];
  isVisible: boolean;
  toggleSidebar: () => void;
  children?: React.ReactElement;
  overlayClassName?: string;  
  headerClassName?: string;   
}

export function Sidebar({
  options,
  isVisible,
  toggleSidebar,
  children,
  overlayClassName,  
  headerClassName,   
}: SidebarProps) {
  return (
    <>
      <div
        className={`fixed lg:hidden inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        } ${overlayClassName}`} 
        onClick={toggleSidebar}
      />
      <div
        className={`bg-base-100 fixed z-50 border-r-[0.5px] border-gray-300 top-0 bottom-0 h-full w-[260px] transition-transform duration-300 ${
          isVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className={`flex justify-between items-center px-6 border-b ${headerClassName}`} 
        >
          <NavLink
            to="/dashboard"
            className="main-logo flex items-center shrink-0 gap-2"
          >
            <img
              className="w-[100px]"
              src={'/icons/logo-app-trim.png'}
              alt="Logo"
            />
          </NavLink>
          <button
            type="button"
            className="collapse-icon"
            onClick={toggleSidebar}
          >
            <BsLayoutSidebarInsetReverse size={20} className="" />
          </button>
        </div>
        <div className="relative">
          <div className="flex flex-col gap-5 p-6">
            {options.map((option, index) => (
              <div key={index}>
                {option.options ? (
                  <>
                    <SidebarOptionNav option={option} isGroup />
                    <ul className="flex flex-col gap-1 font-sans text-base font-normal relative">
                      {option.options?.map((op, indexOp) => (
                        <SidebarOptionNav key={indexOp} option={op} isGroup />
                      ))}
                    </ul>
                  </>
                ) : (
                  <SidebarOptionNav option={option} isGroup />
                )}
              </div>
            ))}
          </div>
        </div>
        {children}
      </div>
    </>
  );
}

const renderIcon = (IconComponent: React.ElementType | undefined) => {
  if (!IconComponent) return null;
  return <IconComponent size={18} />;
};

const SidebarOptionNav = ({
  option,
  isGroup,
}: {
  option: SidebarSingleOption;
  isGroup: boolean;
}) => (
  <>
    {option.url ? (
      <li className="cursor-pointer flex items-center w-full rounded-md hover:bg-base-200 ">
        <NavLink
          to={option.url || ''}
          className={({ isActive }) =>
            `w-full group flex items-center px-3 py-2 gap-3 ${
              isActive ? 'text-primary-500 bg-base-100 rounded-md' : ''
            }`
          }
        >
          {renderIcon(option.icon)}
          <Text className="font-light">{option.text}</Text>
        </NavLink>
      </li>
    ) : (
      <Text className="flex items-center mb-3" size="1">
        {option.text}
      </Text>
    )}
  </>
);

export default Sidebar;
