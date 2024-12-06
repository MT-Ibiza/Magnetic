import { NavLink } from 'react-router-dom';
import { TfiArrowCircleLeft } from 'react-icons/tfi';
import Text from './text';

interface SidebarProps {
  options: {
    text: string;
    key: string;
    url?: string;
    icon?: React.ElementType;
  }[];
  isVisible: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ options, isVisible, toggleSidebar }: SidebarProps) {
  const renderIcon = (IconComponent: React.ElementType | undefined) => {
    if (!IconComponent) return null;
    return <IconComponent size={18} />;
  };

  return (
    <div
      className={`fixed z-50 border-r-[0.5px] border-gray-300 top-0 bottom-0 h-full w-[260px] bg-body dark:bg-black transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-center items-center px-4 py-3">
        <NavLink
          to="/dashboard"
          className="main-logo flex items-center shrink-0 gap-2"
        >
          <Text
            size="4"
            className="block px-4 antialiased tracking-normal leading-snug"
          >
            Magnetic Travel
          </Text>
        </NavLink>
        {/* <button
          type="button"
          className="text-primary hover:text-primary-600 transition duration-300"
          onClick={toggleSidebar}
        >
          <TfiArrowCircleLeft size={24} />
        </button> */}
      </div>
      <div className="relative">
        <ul className="flex flex-col gap-1 min-w-[260px] px-6 py-2 font-sans text-base font-normal relative">
          {options.map((option) => (
            <li
              key={option.key}
              className="cursor-pointer flex items-center w-full  rounded-lg text-start leading-tight transition-all hover:bg-primary-50 hover:bg-opacity-80 focus:bg-primary-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-primary-900 focus:text-primary-900 active:text-primary-900 outline-none"
            >
              <NavLink
                to={option.url || ''}
                className={({ isActive }) =>
                  `w-full group flex items-center p-4 gap-3 ${
                    isActive ? 'text-primary-600' : ''
                  }`
                }
              >
                {renderIcon(option.icon)}
                <Text>{option.text}</Text>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
