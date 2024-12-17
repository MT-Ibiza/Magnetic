import { Service } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  service: Service;
}

function ServiceCard(props: Props) {
  const { service } = props;
  const { name, description, } = service;

  return (
    <div className="relative flex flex-col justify-between bg-base-100 border border-gray-300 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition duration-200 ease-in-out">
      <div className="w-full h-48 bg-gray-100"></div>
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-medium">{name}</h2>
        <div
          className="text-sm text-gray-500 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="p-4 pt-0">
        <button className="w-full py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 focus:outline-none transition duration-150 ease-in-out">
          See more
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
