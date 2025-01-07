import { Service } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  service: Service;
}

function ServiceCardHorizontal(props: Props) {
  const { service } = props;
  const { name, description } = service;

  return (
    <div className="w-full relative flex items-center bg-base-100 border border-gray-300 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition duration-200 ease-in-out">
      <div className="p-4 flex-1">
        <h2 className="text-lg lg:text-xl font-medium">{name}</h2>
        <div
          className="text-sm text-gray-500 line-clamp-2 mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className="flex justify-end w-1/4 bg-base-100">
        <img
          className="object-cover rounded-lg h-[125px] w-[125px]"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
          alt={''}
        />
      </div>
    </div>
  );
}

export default ServiceCardHorizontal;
