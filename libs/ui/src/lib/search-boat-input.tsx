import React, { useState, useEffect, useRef, FC } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Props {
  onChange: (name: string, value: string) => void;
  name: string;
  className?: string;
  defaultValue?: string;
  headingText?: string;
  options: { value: string; label: string }[];
}

export const SearchBoatInput: FC<Props> = ({
  onChange = () => {},
  className = '',
  name,
  defaultValue = '',
  headingText,
  options = [],
}) => {
  const [value, setValue] = useState(defaultValue);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectOption = (item: { value: string; label: string }) => {
    setValue(item.label);
    onChange(name, item.value);
    console.log('name:', name, 'value:', item.value);
  };

  const renderSearchValues = () => {
    return (
      <>
        <p className="block font-semibold text-base">{headingText}</p>
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
          <input
            className="block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate"
            placeholder="Search options"
            value={options.find((opt) => opt.value === value)?.label || ''}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <FaSearch className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">{renderSearchValues()}</div>
      </div>
    </div>
  );
};

export default SearchBoatInput;
