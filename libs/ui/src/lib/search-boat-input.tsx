import React, { useState, useEffect, useRef, FC } from 'react';
import { FaSearch } from 'react-icons/fa';
import Checkbox from './checkbox';

interface Props {
  onChange: (name: string, value: string, data: any) => void;
  name: string;
  className?: string;
  defaultValue?: string;
  headingText?: string;
  allowTyping?: boolean;
  options: { value: string; label: string }[];
  optionCategories?: { name: string; id: number; checked?: boolean }[];
}

export const SearchBoatInput: FC<Props> = ({
  onChange = () => {},
  className = '',
  name,
  defaultValue = '',
  headingText,
  allowTyping,
  options = [],
  optionCategories,
}) => {
  const [value, setValue] = useState(defaultValue);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [categories, setCategories] = useState(optionCategories);

  useEffect(() => {
    setCategories(optionCategories);
  }, [optionCategories]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue); // Actualiza el estado del input
    onChange(name, newValue, null); // Llama a onChange con el nuevo valor
  };
  

  const handleSelectOption = (item: {
    value: string;
    label: string;
    data?: any;
  }) => {
    setValue(item.label);
    onChange(name, item.value, item.data);
  };

const handleCheckboxChange = (checked: boolean, index: number) => {
  const updatedCategories = categories?.map((cat, i) =>
    i === index ? { ...cat, checked } : cat
  );
  setCategories(updatedCategories);
  onChange(name, '', updatedCategories);
};

  const selectedText =
    categories && categories.length > 0 && categories.some((cat) => cat.checked)
      ? categories
          .filter((cat) => cat.checked)
          .map((cat) => cat.name)
          .join(', ')
      : 'Select Category';

  const renderSearchValues = () => {
    return (
      <>
        {/* <p className="block font-semibold text-base">{headingText}</p> */}
        <div className="mt-3">
          {options.map((item) => (
            <div
              className="py-2 mb-1 flex items-center space-x-3 text-sm"
              onClick={() => handleSelectOption(item)}
              key={item.value}
            >
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="relative flex flex-col space-y-5">
          {optionCategories &&
            optionCategories.map((category, index) => (
              <Checkbox
                key={category.name}
                name={category.name}
                label={category.name}
                // subLabel={category.description}
                defaultChecked={category.checked}
                onChange={(checked) => handleCheckboxChange(checked, index)} // ✅ Aquí usas la función
              />
            ))}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          {optionCategories ? (
            <div className="flex gap-[10px] flex-wrap">
              {/* {categories
                ?.filter((cat) => cat.checked)
                .map((cat) => (
                  <div
                    key={cat.id}
                    className={
                      'py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer select-none border border-neutral-300 dark:border-neutral-700'
                    }
                  >
                    {cat.name}
                  </div>
                ))} */}
            </div>
          ) : (
            <>
              <input
                className="block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate"
                placeholder="Search options"
                // readOnly={!allowTyping}
                value={options.find((opt) => opt.value === value)?.label || value} 
                onChange={(e) => setValue(e.currentTarget.value)}
                ref={inputRef}
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
                <FaSearch className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
              </span>
            </>
          )}
        </div>
        <div className={` ${optionCategories ? 'mt-0' : 'mt-7'}`}>
          {renderSearchValues()}
        </div>
      </div>
    </div>
  );
};

export default SearchBoatInput;
