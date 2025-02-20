import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  title: string;
  children?: React.ReactElement;
}

export function AccordionSection(props: Props) {
  const { title, children } = props;

  const [isOpen, setIsOpen] = useState(false);

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
            className={`text-xl transform transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </h2>
      </div>
      {isOpen && (
        <div className="leading-relaxed mt-3 text-neutral-6000 dark:text-neutral-300">
          {children}
        </div>
      )}
    </div>
  );
}

export default AccordionSection;
