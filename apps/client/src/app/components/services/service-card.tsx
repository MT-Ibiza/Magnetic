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
    <div className="flow-root nc-CardCategory4 flex flex-col">
      {/* <div
        className={`absolute top-2 left-2 px-3 py-1 text-xs font-semibold rounded-full ${getPackageLabelColor(
          service.packages[0].name
        )}`}
      >
        {service.packages[0].name}
      </div> */}
      <div
        className={`flex-shrink-0 relative w-full rounded-2xl overflow-hidden group`}
      >
        <img
          src={
            imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
          }
          alt={name}
          className="object-cover h-[350px] w-full"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-15 transition-opacity"></span>
      </div>
      <div className="mt-4 px-2 text-center">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {service.items.length} services
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;
