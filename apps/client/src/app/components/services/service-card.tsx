import { Service } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  service: Service;
}

function ServiceCard(props: Props) {
  const { service } = props;
  const { name, description, imageUrl, packages } = service;

  const getPackageLabelColor = (packageName: string) => {
    switch (packageName.toLowerCase()) {
      case 'gold':
        return 'bg-[#FFD700] text-black';
      case 'platinum':
        return 'bg-[#cfc9c4] text-black';
      case 'diamond':
        return 'bg-[#525052] text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <div className="relative flex flex-col justify-between bg-base-100 border border-gray-300 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition duration-200 ease-in-out">
      <div
        className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${getPackageLabelColor(
          service.packages[0].name
        )}`}
      >
        {service.packages[0].name}
      </div>

      <div className="w-full h-48 bg-gray-100">
        <img
          src={
            imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
          }
          alt={name}
          className="object-cover h-full w-full"
        />
      </div>
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
