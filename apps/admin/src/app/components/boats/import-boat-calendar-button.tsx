import { AirtableBoat, Item } from '@magnetic/interfaces';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@magnetic/ui';
import { importCalendarEvents } from '../../apis/api-calendars';

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
      Sync
    </Button>
  );
}

export default ImportBoatCalendarButton;
