import React from 'react';
import BoatsTableAirtable from '../../components/boats-table-airtable';
import { CardWrapper } from '@magnetic/ui';

interface Props {}

function AirtablePage(props: Props) {
  const {} = props;

  return (
    <CardWrapper className="p-6">
      <div className="header flex flex-col gap-[15px] lg:flex-row lg:justify-between lg:items-center mb-6 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Airtable Boats</h2>
          <p className="text-sm text-gray-500 mt-[8px]">
            Visualize and import boats from airtable
          </p>
        </div>
      </div>
      <BoatsTableAirtable />
    </CardWrapper>
  );
}

export default AirtablePage;
