import { FC, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Image } from '@magnetic/interfaces';
import { Button } from '@magnetic/ui';

interface FormSortImagesProps {
  images: Image[];
  // onChangePosition: (
  //   positions: { imageId: number; position: number }[]
  // ) => void;
  onSave: () => void;
  onCancel: () => void;
}

const FormSortImages: FC<FormSortImagesProps> = ({
  images,
  // onChangePosition,
  onSave,
  onCancel,
}) => {
  const [state, setState] = useState<Image[]>(images);

  function handleSubmitImages() {
    onSave();
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <div>
      <ReactSortable
        list={state}
        setList={(newState) => {
          setState(newState);
          // onChangePosition(
          //   newState.map((image, index) => ({
          //     imageId: image.id,
          //     position: index,
          //   }))
          // );
        }}
        className="grid grid-cols-2 gap-3"
      >
        {state.map((image, index) => (
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
