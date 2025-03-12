import React, { Fragment, FC, useState } from 'react';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { FiGrid } from 'react-icons/fi';
import Checkbox from './checkbox';

const defaultCategories = [
  { name: 'Cocktail', description: 'Mixed alcoholic drinks', checked: false },
  {
    name: 'Beer',
    description: 'Brewed and fermented beverage',
    checked: false,
  },
  { name: 'Wine', description: 'Fermented grape-based drink', checked: false },
  { name: 'Whiskey', description: 'Aged distilled spirit', checked: false },
  {
    name: 'Vodka',
    description: 'Clear distilled alcoholic beverage',
    checked: false,
  },
  {
    name: 'Rum',
    description: 'Distilled from sugarcane or molasses',
    checked: false,
  },
  {
    name: 'Tequila',
    description: 'Mexican distilled spirit from agave',
    checked: false,
  },
  {
    name: 'Gin',
    description: 'Distilled spirit flavored with juniper',
    checked: false,
  },
  {
    name: 'Brandy',
    description: 'Distilled wine or fermented fruit juice',
    checked: false,
  },
  {
    name: 'Liqueur',
    description: 'Sweetened and flavored spirits',
    checked: false,
  },
  { name: 'Cider', description: 'Fermented apple-based drink', checked: false },
  { name: 'Sake', description: 'Japanese rice wine', checked: false },
  {
    name: 'Mezcal',
    description: 'Mexican distilled agave drink',
    checked: false,
  },
  {
    name: 'Champagne',
    description: 'Sparkling wine from France',
    checked: false,
  },
  {
    name: 'Energy Drinks',
    description: 'Caffeinated beverages for energy boost',
    checked: false,
  },
  {
    name: 'Soft Drinks',
    description: 'Carbonated non-alcoholic drinks',
    checked: false,
  },
  {
    name: 'Mocktails',
    description: 'Non-alcoholic cocktail alternatives',
    checked: false,
  },
  {
    name: 'Juices',
    description: 'Freshly squeezed fruit or vegetable drinks',
    checked: false,
  },
  {
    name: 'Smoothies',
    description: 'Blended fruit and dairy-based drinks',
    checked: false,
  },
  {
    name: 'Coffee',
    description: 'Brewed beverage from roasted coffee beans',
    checked: false,
  },
  {
    name: 'Tea',
    description: 'Infused drink from tea leaves or herbs',
    checked: false,
  },
];

export interface SelectCategoryProps {
  onChange?: (categories: any) => void;
  fieldClassName?: string;
  categoriesAvailable: { name: string }[];
}

export const SelectCategory: FC<SelectCategoryProps> = ({
  onChange,
  fieldClassName = '[ nc-hero-field-padding ]',
  categoriesAvailable,
}) => {
  const [categories, setCategories] = useState(defaultCategories);

  let selectedText =
    categories
      .filter((cat) => cat.checked)
      .map((cat) => cat.name)
      .join(', ') || 'Select category';

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
              <FiGrid className="w-6 h-6 lg:w-7 lg:h-7" />
            </div>
            <div className="flex-1">
              <span className="block xl:text-lg font-semibold overflow-hidden">
                <span className="line-clamp-1">{selectedText}</span>
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                Drink Category
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
                    subLabel={category.description}
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
