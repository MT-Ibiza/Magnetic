import React, { useState, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  title: string;
  children?: React.ReactElement;
  defaultOpen?: boolean;
}

export function AccordionSection(props: Props) {
  const { title, children, defaultOpen = false } = props;

  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-base-100 listingSection__wrap overflow-hidden hover:shadow-lg transition-shadow space-y-6">
      <div>
        <h2
          className="text-2xl font-semibold cursor-pointer flex items-center justify-between"
          onClick={toggleAccordion}
        >
          {title}
          <FaAngleDown
            className={`text-xl transform transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          height: isOpen && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0',
        }}
      >
        <div className="mt-3" ref={contentRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionSection;
