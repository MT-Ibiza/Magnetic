import { AirtableBoat, Item } from '@magnetic/interfaces';
import { importBoat } from '../apis/api-airtable';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '@magnetic/ui';

interface Props {
  boat: AirtableBoat;
}

export function ImportBoatButton(props: Props) {
  const { boat } = props;
  const [imported, setImported] = useState(boat.imported);
  const [isSaving, setIsSaving] = useState(false);

  const mutation = useMutation<Item, Error, AirtableBoat>({
    mutationFn: (boat) => {
      return importBoat(boat);
    },
  });

  async function saveBoat() {
    setIsSaving(true);
    await mutation.mutateAsync(boat);
    setTimeout(() => {
      setIsSaving(false);
      setImported(true);
    }, 500);
  }
  return (
    <>
      {imported ? (
        <span>Imported</span>
      ) : (
        <Button
          loading={isSaving}
          loadingText="Importing..."
          onClick={() => {
            saveBoat();
          }}
        >
          Import
        </Button>
      )}
      <br />
      {mutation.isError && <span>Server Error</span>}
    </>
  );
}

export default ImportBoatButton;
