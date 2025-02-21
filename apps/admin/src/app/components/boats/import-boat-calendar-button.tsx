import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Text } from '@magnetic/ui';
import { importCalendarEvents } from '../../apis/api-calendars';
import { FaCalendarAlt } from 'react-icons/fa';

interface Props {
  boatId: number;
}

export function ImportBoatCalendarButton(props: Props) {
  const { boatId } = props;
  const [isSaving, setIsSaving] = useState(false);

  const mutationSynCalendar = useMutation<any, Error, any>({
    mutationFn: (id: number) => {
      return importCalendarEvents(id);
    },
    onSuccess: () => {
      setIsSaving(false);
    },
    onError: () => {
      setIsSaving(false);
    },
  });

  async function importCalendar() {
    setIsSaving(true);
    await mutationSynCalendar.mutateAsync(boatId);
  }

  return (
    <Button
      variant="outline"
      size={1}
      loading={isSaving}
      loadingText="Sync..."
      onClick={importCalendar}
    >
      <div className="flex gap-3 items-center w-full">
        <FaCalendarAlt />
        <Text size="1">Sync </Text>
      </div>
    </Button>
  );
}

export default ImportBoatCalendarButton;
