import React, { FC } from "react";
import { FiSearch } from "react-icons/fi"; 

interface Props {
  onClick: () => void;
}

export const ButtonSubmitFilters: FC<Props> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
    >
      <span className="mr-3 md:hidden">Search</span>
      <FiSearch className="h-6 w-6" />
    </button>
  );
};

export default ButtonSubmitFilters;
