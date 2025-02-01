import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import React from 'react';
import { GoPencil } from 'react-icons/go';

interface Props {}

function CheckoutItemEdit(props: Props) {
  const {} = props;

  return (
    <div className="flex gap-3 hover:text-orange-500 mt-1">
      <Button className="flex gap-1 items-center">
        <GoPencil size={12} />
        <Text size="1" className="text-gray-500 hover:text-orange-500">
          Edit
        </Text>
      </Button>
    </div>
  );
}

export default CheckoutItemEdit;
