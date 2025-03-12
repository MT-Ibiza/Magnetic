import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block w-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <div className="w-full">{children}</div>
      {isVisible && (
        <div className="absolute bottom-full left-0 w-full bg-black text-white text-xs px-3 py-1 rounded shadow-lg text-center mb-2">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
