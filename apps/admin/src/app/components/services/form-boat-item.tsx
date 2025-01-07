import React from 'react';
import FormBoat from '../form-boat';
import FormItem from './form-item';

interface Props {
  serviceId: number;
}

function FormBoatItem(props: Props) {
  const { serviceId } = props;

  return (
    <div className="flex">
      <FormItem
        onSave={() => {}}
        serviceId={serviceId}
        serviceCategories={[]}
      />
    </div>
  );
}

export default FormBoatItem;
