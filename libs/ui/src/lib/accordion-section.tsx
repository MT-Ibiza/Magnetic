import React, { useState, useRef } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import AnimateHeight from 'react-animate-height';

interface Props {
  title: string;
  children?: React.ReactElement;
  defaultOpen?: boolean;
}

export function AccordionSection(props: Props) {
  const { title, children, defaultOpen = false } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-base-100 listingSection__wrap overflow-hidden hover:shadow-lg transition-shadow space-y-6">
      <div>
        <h2
          className="text-[20px] lg:text-2xl font-semibold cursor-pointer flex items-center justify-between"
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
      <AnimateHeight className='custom-accordion' duration={300} height={isOpen ? 'auto' : 0}>
        <div className="mt-[35px]">
          <div className="w-14 mb-[32px] border-b border-neutral-200 dark:border-neutral-700"></div>
          {children}
        </div>
      </AnimateHeight>
    </div>
  );
}

export default AccordionSection;
