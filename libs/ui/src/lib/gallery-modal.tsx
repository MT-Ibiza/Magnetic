import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import SharedModal from './SharedModal';

export interface Image {
  id: number;
  url: string;
  itemId: number;
  createdAt: Date;
}

interface GalleryModalProps {
  images: Image[];
}

export const GalleryModal = ({ images }: GalleryModalProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleShowAllPhotosClick = () => {
    setSelectedIndex(0);
  };

  const handleBackdropClick = () => {
    setSelectedIndex(null);
  };

  const isSingleImage = images.length === 1;
  const isTwoImages = images.length === 2;
  const isThreeImages = images.length === 3;

  return (
    <>
      <header className="rounded-md sm:rounded-xl">
        <div
          className={`h-[200px] lg:h-[480px] relative grid gap-1 sm:gap-2 ${
            isSingleImage
              ? 'w-full h-full'
              : isTwoImages
              ? 'grid-cols-2'
              : isThreeImages
              ? 'grid-cols-2 grid-rows-2'
              : 'grid-cols-4'
          }`}
        >
          {isSingleImage ? (
            <div
              className="relative w-full h-full rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedIndex(0)}
            >
              <img
                src={images[0].url}
                alt="0"
                className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
            </div>
          ) : (
            <>
              {isTwoImages ? (
                <>
                  <div
                    className="relative col-span-1 rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(0)}
                  >
                    <img
                      src={images[0].url}
                      alt="0"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div
                    className="relative col-span-1 rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(1)}
                  >
                    <img
                      src={images[1].url}
                      alt="1"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                </>
              ) : isThreeImages ? (
                <>
                  <div
                    className="relative col-span-1 row-span-2 rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(0)}
                  >
                    <img
                      src={images[0].url}
                      alt="0"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div
                    className="relative col-span-1 row-span-1 rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(1)}
                  >
                    <img
                      src={images[1].url}
                      alt="1"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div
                    className="relative col-span-1 row-span-1 rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(2)}
                  >
                    <img
                      src={images[2].url}
                      alt="2"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="col-span-2 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(0)}
                  >
                    <img
                      src={images[0].url}
                      alt="0"
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div
                    className="col-span-1 row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setSelectedIndex(1)}
                  >
                    <img
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      src={images[1].url}
                      alt="1"
                      sizes="400px"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  {images
                    .filter((_, i) => i >= 2 && i < 4)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => setSelectedIndex(index + 2)}
                      >
                        <div className="aspect-w-4 aspect-h-3">
                          <img
                            className="absolute inset-0 object-cover w-full h-full rounded-md sm:rounded-xl"
                            src={item.url || ''}
                            alt="photos"
                            sizes="400px"
                          />
                        </div>
                        <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
          {images.length > 4 && (
            <div
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
              onClick={handleShowAllPhotosClick}
            >
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </div>
          )}
        </div>
      </header>
      {selectedIndex !== null && (
        <Dialog
          static
          open={true}
          onClose={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black bg-opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />
          <SharedModal
            index={selectedIndex}
            images={images}
            changePhotoId={(newIndex) => setSelectedIndex(newIndex)}
            closeModal={() => setSelectedIndex(null)}
            navigation={true}
          />
        </Dialog>
      )}
    </>
  );
};
