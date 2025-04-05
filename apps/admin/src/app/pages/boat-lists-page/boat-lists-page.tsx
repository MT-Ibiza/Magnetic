import { Button, CardWrapper } from '@magnetic/ui';
import React from 'react';
import ListsTable from '../../components/lists-table';

interface Props {}

function BoatListsPage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Boat Lists</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Create and share public lists of boats.
          </p>
        </div>
        <div className="flex gap-3 justify-end lg:w-auto w-full">
          <Button
            href={'/list/boats/new'}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            + Create List
          </Button>
        </div>
      </div>
      <ListsTable type="boat_rental" />
    </CardWrapper>
  );
}

export default BoatListsPage;
