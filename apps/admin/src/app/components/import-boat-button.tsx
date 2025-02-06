import { AirtableBoat, Item } from '@magnetic/interfaces';
import { importBoat, reImportBoat } from '../apis/api-airtable';
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

  const importMutation = useMutation<Item, Error, AirtableBoat>({
    mutationFn: (boat) => {
      return importBoat(boat);
    },
  });

  const reImportMutation = useMutation<Item, Error, AirtableBoat>({
    mutationFn: (boat) => {
      return reImportBoat(boat);
    },
  });

  async function saveBoat() {
    setIsSaving(true);
    if (imported) {
      await reImportMutation.mutateAsync(boat);
    } else {
      await importMutation.mutateAsync(boat);
    }
    setTimeout(() => {
      setIsSaving(false);
      setImported(true);
    }, 500);
  }
  return (
    <>
      {imported ? (
        <Button
          variant="outline"
          size={1}
          loading={isSaving}
          loadingText="Sync..."
          onClick={() => {
            saveBoat();
          }}
        >
          Sync
        </Button>
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
      {importMutation.isError && <span>Server Error</span>}
    </>
  );
}

export default ImportBoatButton;
