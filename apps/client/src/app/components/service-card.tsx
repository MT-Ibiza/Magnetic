import { Service } from '@magnetic/interfaces';
import { CardWrapper, Text } from '@magnetic/ui';
import React from 'react';

interface Props {
  service: Service;
}

function ServiceCard(props: Props) {
  const { service } = props;
  const { name, description } = service;

  return (
    <CardWrapper>
      <Text>{name}</Text>
    </CardWrapper>
  );
}

export default ServiceCard;
