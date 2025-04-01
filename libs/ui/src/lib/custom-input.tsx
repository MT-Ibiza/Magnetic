'use client';

import React, { useState, useRef, useEffect, FC, ReactNode } from 'react';
import ClearDataButton from './clear-btn';
import Tooltip from './tooltip';

export interface CustomInputProps {
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
}

export const CustomInput: FC<CustomInputProps> = ({
  name,
  options,
  value,
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
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [inputValue, setInputValue] = useState(
    options.find((opt) => opt.value === value)?.label || ''
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (value === '') {
      const option = options.find((op) => op.value === '');
      setInputValue(option?.label || '');
    }
  }, [value]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowPopover(false);
    }
  };

  const handleSelectOption = (option: any) => {
    onChange(name, option.value, option.data);
    setInputValue(option.label);
    setShowPopover(false);
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

  const filteredOptions = allowTyping
    ? options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : options;

  function onRemoveFilter(name: string, label: string) {
    onChange(name, '');
    setInputValue(label);
    setShowPopover(false);
  }

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => !allowTyping && setShowPopover(!showPopover)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? 'nc-hero-field-focused' : ''
        } ${disable ? 'pointer-events-none opacity-45' : ''}`}
      >
        <>
          {icon && <div className="text-neutral-300">{icon}</div>}
          <div className="flex-1">
            <input
              className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 truncate cursor-pointer"
              placeholder={placeHolder}
              value={inputValue}
              name={name}
              readOnly={!allowTyping}
              onClick={() => allowTyping && setShowPopover(true)}
              onChange={allowTyping ? handleInputChange : undefined}
              ref={inputRef}
            />
            {value && (
              <ClearDataButton
                onClick={() => {
                  const option = options.find((op) => op.value === '');
                  onRemoveFilter(name, option?.label || name);
                }}
              />
            )}
            <span className="block mt-0.5 text-sm text-neutral-400 font-light">
              <span className="line-clamp-1">{desc}</span>
            </span>
          </div>
        </>
      </div>

      {showPopover && options.length > 0 && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && options.length > 0 && (
        <div className="absolute left-0 z-40 w-full min-w-[200px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {filteredOptions.map((option) => (
            <span
              key={option.value}
              onClick={() => handleSelectOption(option)}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                {option.label}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
