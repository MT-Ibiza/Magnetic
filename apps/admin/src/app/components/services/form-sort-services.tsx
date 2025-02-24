import { FC, useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Service, SortServices } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useServices } from '../../hooks/useServices';
import { sortServices } from '../../apis/api-services';

interface FormSortServicesProps {
  onSave: () => void;
  onCancel: () => void;
}

const FormSortServices: FC<FormSortServicesProps> = ({ onSave, onCancel }) => {
  const [sortedServices, setSortedServices] = useState<Service[]>([]);
  const { isLoading, services, error, data } = useServices();

  useEffect(() => {
    if (services) {
      const initialServicesSorted = [...services].sort(
        (a, b) => a.position - b.position
      );
      setSortedServices(initialServicesSorted);
    }
  }, [data]);

  const sortServicesPosition = useMutation<any, Error, SortServices>({
    mutationFn: (data) => {
      return sortServices(data);
    },
    onSuccess: () => {
      onSave();
      toast.success(`Services sorted!`);
    },
    onError: () => {
      toast.success(`Services couldn't be sorted!`);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  async function handleSubmit() {
    const positions = sortedServices.map((service, index) => ({
      serviceId: service.id,
      position: index,
    }));
    await sortServicesPosition.mutateAsync({
      positions,
    });
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div>
      <ReactSortable
        list={sortedServices}
        setList={(newState) => {
          setSortedServices(newState);
        }}
        className="flex flex-col gap-3"
      >
        {sortedServices.map((service, index) => (
          <div
            key={service.id}
            className="cursor-pointer p-2 bg-gray-100 rounded-lg flex gap-3"
          >
            <span className=" bg-black text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </span>
            <Text>{service.name}</Text>
          </div>
        ))}
      </ReactSortable>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </div>
    </div>
  );
};

export default FormSortServices;
