import React from 'react';

interface Props {}

function SkeletonPlan(props: Props) {
  const {} = props;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
      <div className="col-span-8 flex flex-col gap-[20px]">
        <div className="h-80 w-full bg-gray-200 rounded-lg"></div>
        <div className="h-80 w-full bg-gray-200 rounded-lg"></div>
      </div>
      <div className="col-span-4 w-full h-60 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export default SkeletonPlan;
