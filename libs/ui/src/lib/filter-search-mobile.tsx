import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from '@headlessui/react';

import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineFilter,
} from 'react-icons/ai';

interface Props {
  children?: React.ReactElement;
  onCLose?: () => void;
}

export const FilterSearchMobile = (props: Props) => {
  const { children } = props;
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
    setShowDialog(true);
  }

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className="relative flex items-center w-full border border-neutral-200 dark:border-neutral-6000 px-4 py-2 pr-11 rounded-full shadow-lg"
      >
        <AiOutlineSearch className="flex-shrink-0 w-5 h-5" />
        <div className="ml-3 flex-1 text-left overflow-hidden">
          <span className="block font-medium text-sm">Search</span>
          <div className="block mt-0.5 text-xs font-light text-neutral-500 dark:text-neutral-400 ">
            <span className="line-clamp-1">
              Capacity • Size • Budget • Calendar
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-6000 dark:text-neutral-300">
          <AiOutlineFilter className="block w-4 h-4" />
        </span>
      </button>
    );
  };

  return (
    <div className="FilterSearchMobile">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <TransitionChild
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <DialogPanel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  {showDialog && (
                    <TabGroup
                      className={'flex flex-col justify-between h-full'}
                      manual
                    >
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <AiOutlineClose className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>
                      <TabList className="pt-12 flex w-full justify-center font-semibold text-sm sm:text-base text-neutral-500 dark:text-neutral-400 space-x-6 sm:space-x-8">
                        {['Filters'].map((item, index) => (
                          <Tab key={index} as={Fragment}>
                            {({ selected }) => (
                              <div className="relative focus:outline-none focus-visible:ring-0 outline-none select-none">
                                <div
                                  className={`${
                                    selected ? 'text-black dark:text-white' : ''
                                  }  `}
                                >
                                  {item}
                                </div>
                                {selected && (
                                  <span className="absolute inset-x-0 top-full border-b-2 border-black dark:border-white"></span>
                                )}
                              </div>
                            )}
                          </Tab>
                        ))}
                      </TabList>
                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <TabPanels className="flex-1 overflow-y-auto hiddenScrollbar py-4">
                          <TabPanel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              {React.cloneElement(children!, {
                                onClose: closeModal,
                              })}
                            </div>
                          </TabPanel>
                        </TabPanels>
                      </div>
                    </TabGroup>
                  )}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default FilterSearchMobile;
