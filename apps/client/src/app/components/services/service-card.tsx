import { Service } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  service: Service;
}

function ServiceCard(props: Props) {
  const { service } = props;
  const { name, description, imageUrl } = service;

  return (
    <div className="flow-root nc-CardCategory4 flex flex-col relative group">
      <div className="flex-shrink-0 relative w-full rounded-2xl overflow-hidden">
        <img
          src={
            imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
          }
          alt={name}
          className="object-cover h-[350px] w-full transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4 text-white text-center transition-opacity duration-500 ease-in-out opacity-100 group-hover:opacity-0">
          <h2 className="text-2xl font-medium truncate">{name}</h2>
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-0 flex flex-col items-center justify-center text-center text-white transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100 group-hover:bg-opacity-80 p-4">
          <h2 className="text-2xl text-white dark:text-neutral-100 font-medium truncate">
            {name}
          </h2>
          <div
            style={{ fontWeight: 300 }}
            className="text-sm mt-4 line-clamp-[5]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
