import { NavLink } from 'react-router-dom';
import Icon from './icon';

interface SidebarProps {
  options: {
    text: string;
    key: string;
    url?: string;
    icon?: string;
  }[];
  isVisible: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ options, isVisible, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`fixed shadow-xl shadow-blue-gray-900/5 z-50 top-0 bottom-0 h-full w-[20rem] bg-body dark:bg-black transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3">
        <NavLink
          to="/dashboard"
          className="main-logo flex items-center shrink-0 gap-2"
        >
          <h5 className="block px-4 antialiased tracking-normal text-xl leading-snug text-gray-900">
            Magnetic Travel
          </h5>
        </NavLink>
        <button
          type="button"
          className="text-primary w-8 h-8 rounded-full flex justify-center items-center hover:bg-primary-50 dark:hover:bg-dark-light/10 transition duration-300"
          onClick={toggleSidebar}
        >
          <Icon icon="d-arrow-left" size={15} />
        </button>
      </div>
      <div className="relative">
        <ul className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 relative">
          {options.map((option) => (
            <li className="cursor-pointer flex items-center w-full p-4 rounded-lg text-start leading-tight transition-all hover:bg-primary-50 hover:bg-opacity-80 focus:bg-primary-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-primary-900 focus:text-primary-900 active:text-primary-900 outline-none">
              {' '}
              <NavLink
                to={option.url || ''}
                className={({ isActive }) =>
                  `w-full group flex items-center gap-3 ${
                    isActive ? 'text-primary-6000' : ''
                  }`
                }
              >
                <Icon icon={option.icon || 'plus'} size={18} />
                <span>{option.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
