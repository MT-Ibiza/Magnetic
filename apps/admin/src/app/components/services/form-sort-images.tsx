import { FC, useMemo, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Image, ImageBase, SortImages } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';
import { useMutation } from '@tanstack/react-query';
import { sortImages } from '../../apis/api-images';
import { toast } from 'sonner';
import { sortImagesByPosition } from '@magnetic/utils';

interface FormSortImagesProps {
  itemId: number;
  images: Image[];
  onSave: () => void;
  onCancel: () => void;
}

const FormSortImages: FC<FormSortImagesProps> = ({
  itemId,
  images,
  onSave,
  onCancel,
}) => {
  const initialImagesSorted = useMemo(() => {
    return sortImagesByPosition(images);
  }, [images]);

  const [sortedImages, setSortedImages] =
    useState<ImageBase[]>(initialImagesSorted);
  const sortImagesPosition = useMutation<any, Error, SortImages>({
    mutationFn: (data) => {
      return sortImages(data);
    },
    onSuccess: () => {
      onSave();
      toast.success(`Images sorted!`);
    },
    onError: () => {
      toast.success(`Images couldn't be sorted!`);
    },
  });

  async function handleSubmitImages() {
    const positions = sortedImages.map((image, index) => ({
      imageId: image.id,
      position: index,
    }));
    await sortImagesPosition.mutateAsync({
      itemId,
      positions,
    });
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div>
      <ReactSortable
        list={sortedImages}
        setList={(newState) => {
          setSortedImages(newState);
        }}
        className="grid grid-cols-2 gap-3"
      >
        {sortedImages.map((image, index) => (
          <div
            key={image.id}
            className="relative p-2 bg-gray-100 rounded-lg overflow-hidden"
          >
            <span className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </span>
            <img
              src={image.url}
              alt="image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </ReactSortable>
      <div className="buttons flex justify-end gap-3 p-4 w-full absolute bottom-0 right-0">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSubmitImages}>Save Changes</Button>
      </div>
    </div>
  );
};

export default FormSortImages;
