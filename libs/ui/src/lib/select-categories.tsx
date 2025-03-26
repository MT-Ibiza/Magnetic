import React, { Fragment, FC, useState } from 'react';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { MdWineBar } from 'react-icons/md';
import Checkbox from './checkbox';

export interface SelectCategoryProps {
  onChange?: (categories: any) => void;
  fieldClassName?: string;
  categoriesAvailable: { name: string; id: number; checked?: boolean }[];
}

export const SelectCategory: FC<SelectCategoryProps> = ({
  onChange,
  fieldClassName = '[ nc-hero-field-padding ]',
  categoriesAvailable,
}) => {
  const [categories, setCategories] = useState(categoriesAvailable);

  let selectedText =
    categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.name)
      .join(', ') || 'Search by type';

  return (
    <Popover className="flex relative flex-1">
      {({ open }) => (
        <>
          <PopoverButton
            className={`flex z-10 text-left w-full flex-shrink-0 items-center ${fieldClassName} space-x-3 focus:outline-none cursor-pointer ${
              open ? 'nc-hero-field-focused' : ''
            }`}
          >
            <div className="text-neutral-300 dark:text-neutral-400">
              <MdWineBar className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">{selectedText}</span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                Select categories
              </span>
            </div>
          </PopoverButton>
          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -inset-x-0.5 bg-white dark:bg-neutral-800"></div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute left-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-600 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl max-h-[600px] overflow-y-auto">
              <div className="relative flex flex-col space-y-5">
                {categories.map((category, index) => (
                  <Checkbox
                    key={category.name}
                    name={category.name}
                    label={category.name}
                    // subLabel={category.description}
                    defaultChecked={category.checked}
                    onChange={(checked) => {
                      const updatedCategories = categories.map((cat, i) =>
                        i === index ? { ...cat, checked } : cat
                      );
                      setCategories(updatedCategories);
                      onChange && onChange(updatedCategories);
                    }}
                  />
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default SelectCategory;
