import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export interface Image {
  id: number;
  url: string;
  itemId: number;
  createdAt: Date;
}

interface ImageGridProps {
  images: Image[];
  onChangePosition: (
    positions: { imageId: number; position: number }[]
  ) => void;
}

// const SortableImage: React.FC<{ image: Image }> = ({ image }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: image.id.toString() });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="border rounded-lg shadow-lg bg-white cursor-move p-2"
//     >
//       <img
//         src={image.url}
//         alt={`Image ${image.id}`}
//         className="w-full h-full object-cover rounded-lg"
//       />
//     </div>
//   );
// };

const SortableImage: React.FC<{ image: Image }> = ({ image }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1, // Hacerlo semi-transparente mientras se arrastra
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative border rounded-lg shadow-lg bg-white cursor-move p-2 transition-all
        ${isDragging ? 'bg-gray-300 border-dashed border-2' : ''} `}
    >
      <img
        src={image.url}
        alt={`Image ${image.id}`}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>
  );
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, onChangePosition }) => {
  const [imageList, setImageList] = useState(images);
  const [activeImage, setActiveImage] = useState<Image | null>(null);

  // Configurar sensores para limitar el área de arrastre
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // El usuario debe mover al menos 5px antes de activar el arrastre
      },
    })
  );

  const handleDragStart = (event: any) => {
    const draggedImage = imageList.find(
      (img) => img.id.toString() === event.active.id
    );
    setActiveImage(draggedImage || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveImage(null); // Reset del DragOverlay

    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = imageList.findIndex(
      (img) => img.id.toString() === active.id
    );
    const newIndex = imageList.findIndex(
      (img) => img.id.toString() === over.id
    );

    const newImageList = arrayMove(imageList, oldIndex, newIndex);
    setImageList(newImageList);

    onChangePosition(
      newImageList.map((img, index) => ({ imageId: img.id, position: index }))
    );
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors} // Agregamos los sensores configurados
    >
      <SortableContext
        items={imageList.map((img) => img.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-3 gap-4 p-4 border-2 border-gray-300 rounded-lg">
          {imageList.map((image) => (
            <SortableImage key={image.id} image={image} />
          ))}
        </div>
      </SortableContext>

      {/* DragOverlay para evitar que la imagen se desplace fuera del contenedor */}
      <DragOverlay>
        {activeImage ? (
          <div className="border rounded-lg shadow-lg bg-white cursor-move p-2 opacity-80">
            <img
              src={activeImage.url}
              alt={`Image ${activeImage.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ImageGrid;
