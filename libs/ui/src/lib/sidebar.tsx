import { NavLink } from 'react-router-dom';
import Icon from './icon';

interface Props {
  options: {
    text: string;
    key: string;
    url?: string;
    icon?: string;
  }[];
}

export function Sidebar(props: Props) {
  const { options } = props;
  const semidark = false;

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar z-100 fixed min-h-screen h-full w-full top-0 bottom-0 h-[calc(100vh-2rem)] max-w-[18rem] px-4 shadow-xl  shadow-blue-gray-900/5 z-50 transition-all duration-300
        ${semidark ? 'text-white-dark' : ''}
      `}
      >
        <div className="bg-body dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink
              to="/dashboard"
              className="main-logo flex items-center shrink-0 gap-2"
            >
              <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
                Magnetic Travel
              </h5>
            </NavLink>
          </div>
          <div className="relative">
            <ul className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 relative">
              {options.map((option, index) => {
                return (
                  <div key={index}>
                    {option.url && (
                      <li className="cursor-pointer flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-primary-50 hover:bg-opacity-80 focus:bg-primary-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-primary-900 focus:text-primary-900 active:text-primary-900 outline-none">
                        <NavLink 
                          to={option.url} 
                          className={({ isActive }) => 
                            `w-full group flex items-center gap-3 ${isActive ? 'text-primary-6000' : ''}`
                          }
                        >
                          <Icon icon={option.icon || 'plus'} size={18} />
                          <span>{option.text}</span>
                        </NavLink>
                      </li>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
