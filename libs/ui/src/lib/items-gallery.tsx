import { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export interface Image {
  id: number;
  url: string;
  itemId: number;
  createdAt: Date;
}

interface ItemsGalleryProps {
  images: Image[];
}

export const ItemsGallery = ({ images }: ItemsGalleryProps) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = images.map((image) => ({
    original: image.url,
    thumbnail: image.url,
    description: '',
  }));

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseLightbox();
      }
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isLightboxOpen]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const gridClasses = 'grid grid-cols-2 gap-2 w-full';

  return (
    <div className={`${gridClasses}`}>
      <div
        className="col-span-2 relative rounded-md overflow-hidden cursor-pointer"
        style={{ height: '500px' }}
      >
        <ImageGallery
          items={galleryImages}
          startIndex={currentImageIndex}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={true}
          showThumbnails={false}
          showNav={true}
          slideInterval={3000}
          renderItem={(item) => (
            <div
              className="rounded-[10px] bg-red relative w-full h-full flex"
              style={{ height: '500px' }}
            >
              <img
                className="rounded-[10px] inset-0 object-contain w-full h-full"
                src={item.original}
                alt={item.description}
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};
