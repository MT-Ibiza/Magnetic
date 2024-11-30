import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Icon from './icon';

interface Props {
  options: {
    text: string;
    key: string;
    url?: string;
    icon?: string;
    links: {
      icon?: string;
      text: string;
      url: string;
    }[];
  }[];
}

export function Sidebar(props: Props) {
  const { options } = props;
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const semidark = false;

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav
        className={`sidebar fixed min-h-screen h-full w-full top-0 bottom-0 h-[calc(100vh-2rem)] max-w-[20rem] px-4 shadow-xl  shadow-blue-gray-900/5 z-50 transition-all duration-300
        ${semidark ? 'text-white-dark' : ''}
      `}
      >
        <div className="bg-body dark:bg-black h-full">
          <div className="flex justify-between items-center px-4 py-3">
            <NavLink
              to="/dashboard"
              className="main-logo flex items-center shrink-0 gap-2"
            >
              {/* <img
                className="mr-1 inline cover"
                src="/icons/logo-app.png"
                alt="Logo"
                width='55px'
              /> */}
              <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
                Magnetic Travel
              </h5>
            </NavLink>
          </div>
          <div className="relative">
            <ul className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700 relative">
              {options.map((option, index) => {
                const isOpen = openMenus.includes(option.key);
                return (
                  <div key={index}>
                    {option.url ? (
                      <li className="cursor-pointer flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <NavLink to={option.url} className="w-full group">
                          <div className="flex items-center gap-3 hover:text-primary">
                            <Icon icon={option.icon || 'plus'} size={18} />
                            <span>{option.text}</span>
                          </div>
                        </NavLink>
                      </li>
                    ) : (
                      <li className="cursor-pointer menu flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                        <button
                          type="button"
                          className={`${
                            isOpen ? 'active' : ''
                          } nav-link group w-full`}
                          // onClick={() => toggleMenu(option.key)}
                        >
                          <div className="flex items-center gap-3 hover:text-primary">
                            <Icon
                              icon={option.icon || 'plus'}
                              className="group-hover:text-primary shrink-0"
                              size={18}
                            />
                            <span className="ltr:pl-3 rtl:pr-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                              {option.text}
                            </span>
                          </div>
                          <div
                            className={isOpen ? '' : 'rotate-180 -rotate-90'}
                          >
                            <Icon icon="keyboard-arrow-up" size={20} />
                          </div>
                        </button>
                        <ul className="sub-menu text-gray-500">
                          {option.links.map((link, key) => (
                            <li key={key}>
                              <NavLink className="pl-2" to={link.url}>
                                {link.text}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
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
