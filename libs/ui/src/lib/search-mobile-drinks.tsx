'use client';

import React, { useState, useRef, useEffect, FC, ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';

export interface SearchInputMobileDrinkProps {
  name: string;
  options: { value: string; label: string; data?: any }[];
  value: string;
  onChange: (name: string, value: string, data?: any) => void;
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  allowTyping?: boolean;
  icon?: ReactNode;
  disable?: boolean;
  highlight?: boolean;
  tooltip?: string;
  headingText?: string;
}

export const SearchInputMobileDrink: FC<SearchInputMobileDrinkProps> = ({
  name,
  options,
  value,
  headingText,
  onChange,
  placeHolder = 'Select an option',
  desc = 'Choose an option',
  className = 'nc-flex-1.5',
  divHideVerticalLineClass = 'left-10 -right-0.5',
  autoFocus = false,
  allowTyping = false,
  icon,
  disable = false,
  highlight = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [showPopover, setShowPopover] = useState(autoFocus);
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    if (
      !showPopover &&
      value !== undefined &&
      value !== inputValue
    ) {
      setInputValue(value);
    }
  }, [value, showPopover]);

  useEffect(() => {
    if (showPopover) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowPopover(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setInputValue(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(name, value);
    }, 500);
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
            placeholder={placeHolder}
            value={inputValue}
            name={name}
            readOnly={!allowTyping}
            onClick={() => allowTyping && setShowPopover(true)}
            onChange={allowTyping ? handleInputChange : undefined}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <FaSearch className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchInputMobileDrink;
