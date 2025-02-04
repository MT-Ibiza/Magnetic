import React from 'react';

interface Props {}

function BoatsTableAirtable(props: Props) {
  const {} = props;

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Port</th>
            <th>Length</th>
            <th>Capacity</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default BoatsTableAirtable;
