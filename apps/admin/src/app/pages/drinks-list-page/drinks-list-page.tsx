import { CardWrapper } from '@magnetic/ui';
import React from 'react';

interface Props {}

function DrinksListPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Drinks List</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Create and share public list of drinks.
          </p>
        </div>
      </div>
    </CardWrapper>
  );
}

export default DrinksListPage;
