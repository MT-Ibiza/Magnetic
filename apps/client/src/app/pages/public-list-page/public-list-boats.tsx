import { Item } from '@magnetic/interfaces';
import { EmptyState, GridSkeleton } from '@magnetic/ui';
import React, { useState } from 'react';
import { FaShip } from 'react-icons/fa';
import FilterBoats from '../view-service-page/filter-boats';
import ItemBoatCard from '../../components/items/cards/item-boat-card';
import { getNumberMonth } from '@magnetic/utils';
import ListBoats from '../view-service-page/list-boats';

interface Props {
  items: Item[];
  slug: string;
}

function PublicListBoats(props: Props) {
  const { items, slug } = props;

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[40px]">
      <ListBoats slugGuestMode={slug} />
    </div>
  );
}

export default PublicListBoats;
