import React, { useState, Fragment, useEffect } from 'react';
import { Transition, Dialog, TransitionChild } from '@headlessui/react';
import { useLocation } from 'react-router-dom';
import NavMobile from './menu-nav-mobile';
import { HiMenu } from 'react-icons/hi';

export interface MenuBarProps {
  className?: string;
  iconClassName?: string;
}
const MenuBar: React.FC<MenuBarProps> = ({
  className = 'p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300',
  iconClassName = 'h-7 w-7',
}) => {
  const [isVisable, setIsVisable] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsVisable(false);
  }, [location]);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={handleCloseMenu}
        >
          <TransitionChild
            as={Fragment}
            enter=" duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave=" duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
          </TransitionChild>
          <div className="fixed inset-0">
            <div className="flex justify-end min-h-full ">
              <TransitionChild
                as={Fragment}
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-56"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-56"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden transition-all ">
                  <NavMobile onClickClose={handleCloseMenu} />
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className={`focus:outline-none flex items-center justify-center ${className}`}
      >
        <HiMenu className={iconClassName} />
      </button>
      {renderContent()}
    </>
  );
};

export default MenuBar;
