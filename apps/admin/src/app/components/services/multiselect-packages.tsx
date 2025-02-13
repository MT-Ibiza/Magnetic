import { useState } from 'react';
import { Package } from '@magnetic/interfaces';

interface Props {
  packages: Package[];
  onSelect: (ids: number[]) => void;
  selected: number[];
}

function MultiselectPackages({ packages, onSelect, selected }: Props) {
  const [selectedIds, setSelectedIds] = useState<number[]>(selected);
  const toggleSelection = (id: number) => {
    let newSelectedIds;
    if (selectedIds.includes(id)) {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      newSelectedIds = [...selectedIds, id];
    }
    setSelectedIds(newSelectedIds);
    onSelect(newSelectedIds);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {packages.map((p) => (
        <div
          key={p.id}
          onClick={() => toggleSelection(p.id)}
          className={`px-4 py-2 border rounded cursor-pointer ${
            selectedIds.includes(p.id)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
        >
          {p.name}
        </div>
      ))}
    </div>
  );
}

export default MultiselectPackages;
