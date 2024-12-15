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
}

export function Sidebar({
  options,
  isVisible,
  toggleSidebar,
  children,
}: SidebarProps) {
  // function isOptionGroup(object: any): object is SidebarOptionGroup {
  //   return 'options' in object;
  // }

  return (
    <div
      className={`bg-base-100 fixed z-50 border-r-[0.5px] border-gray-300 top-0 bottom-0 h-full w-[260px] transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center py-2 px-6 border-b">
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
        <button type="button" className="collapse-icon" onClick={toggleSidebar}>
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
        {/* <ul className="flex flex-col gap-1 min-w-[260px] px-6 py-2 font-sans text-base font-normal relative">
          {options.map((option) => (
            <li
              key={option.key}
              className="cursor-pointer flex items-center w-full  rounded-lg text-start leading-tight transition-all hover:bg-primary-50 hover:bg-opacity-80 focus:bg-primary-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-primary-900 focus:text-primary-900 active:text-primary-900 outline-none"
            >
              <NavLink
                to={option.url || ''}
                className={({ isActive }) =>
                  `w-full group flex items-center p-4 gap-3 ${
                    isActive ? 'text-primary-500 bg-zinc-100 rounded-md' : ''
                  }`
                }
              >
                {renderIcon(option.icon)}
                <Text>{option.text}</Text>
              </NavLink>
            </li>
          ))}
        </ul> */}
      </div>
      {children}
    </div>
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
