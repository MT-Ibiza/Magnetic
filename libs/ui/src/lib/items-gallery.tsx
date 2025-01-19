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

  return (
    <div className="grid grid-cols-2 gap-1">
      <div
        className="col-span-1 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
        onClick={() => handleImageClick(0)}
      >
        <img
          className="inset-0 object-cover rounded-md sm:rounded-xl w-full h-[500px]"
          src={galleryImages[0].original}
          alt=""
        />
        <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>
      {galleryImages
        .filter((_, i) => i >= 1 && i < 5)
        .map((item, index) => (
          <div
            key={index}
            className={`relative rounded-md sm:rounded-xl overflow-hidden ${
              index >= 3 ? 'hidden sm:block' : ''
            }`}
            onClick={() => handleImageClick(index + 1)}
          >
            <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
              <img
                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                src={item.original || ''}
                alt=""
                sizes="400px"
              />
            </div>
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>
        ))}

      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center"
          onClick={handleCloseLightbox}
        >
          <div
            style={{ width: '100vw', margin: 'auto' }}
            onClick={handleModalClick}
          >
            <ImageGallery
              items={galleryImages}
              startIndex={currentImageIndex}
              showFullscreenButton={false}
              showPlayButton={false}
              showBullets={true}
              showThumbnails={false}
              showNav={true}
              renderLeftNav={(onClick, disabled) => (
                <button
                  className={`lg-nav-button left-0 ${disabled ? 'hidden' : ''}`}
                  onClick={onClick}
                >
                  &#8249;
                </button>
              )}
              renderRightNav={(onClick, disabled) => (
                <button
                  className={`lg-nav-button right-0 ${
                    disabled ? 'hidden' : ''
                  }`}
                  onClick={onClick}
                >
                  &#8250;
                </button>
              )}
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={handleCloseLightbox}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
