import { Service } from '@magnetic/interfaces';
import React, { FC } from 'react';
// import PostCardMeta from "components/PostCardMeta/PostCardMeta";
// import { PostDataType } from "data/types";
import { Link } from 'react-router-dom';
// import NcImage from "shared/NcImage/NcImage";

export interface Props {
  className?: string;
  service: Service;
  href?: string;
}

export function Card3Small(props: Props) {
  const { service, className, href } = props;
  const { name, description, imageUrl } = service;

  return (
    <div
      className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center ${className}`}
      data-nc-id="Card3Small"
    >
      <div className="relative space-y-2">
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link to={href || ''} className=" line-clamp-2">
            {name}
          </Link>
        </h2>
        <div
          className="text-sm text-gray-500 line-clamp-2 mt-2"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <Link
        to={href || ''}
        className={`block sm:w-20 flex-shrink-0 relative rounded-lg overflow-hidden mb-5 sm:ml-4 sm:mb-0 group`}
      >
        <img
          className="object-cover rounded-r-lg h-[100px] w-[120px] group-hover:scale-110 transform transition-transform duration-300"
          src={
            imageUrl ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
          }
        />
      </Link>
    </div>
  );
}

export default Card3Small;
