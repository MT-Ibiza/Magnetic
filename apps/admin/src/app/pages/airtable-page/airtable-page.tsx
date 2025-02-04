import React from 'react';
import BoatsTableAirtable from '../../components/boats-table-airtable';

interface Props {}

function AirtablePage(props: Props) {
  const {} = props;

  return (
    <div>
      <BoatsTableAirtable />
    </div>
  );
}

export default AirtablePage;
