import {
  HiArrowDownTray,
  HiArrowTopRightOnSquare,
  HiArrowUturnLeft,
  HiChevronLeft,
  HiChevronRight,
  HiXMark,
} from 'react-icons/hi2';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Image } from '@magnetic/interfaces';
import { useEffect } from 'react';

interface SharedModalProps {
  index: number;
  images?: Image[];
  currentPhoto?: Image;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export const variants = (x = 1000, opacity = 0) => ({
  enter: (direction: number) => ({
    x: direction > 0 ? x : -x,
    opacity,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? x : -x,
    opacity,
  }),
});

export default function SharedModal({
  index,
  images = [],
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);

  let currentImage = images?.[index] || currentPhoto;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (index > 0) {
          changePhotoId(index - 1);
        }
      } else if (event.key === 'ArrowRight') {
        if (index < images.length - 1) {
          changePhotoId(index + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [index, images.length, changePhotoId]);

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants()}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <img
                  src={currentImage?.url || ''}
                  width={navigation ? 1280 : 1920}
                  height={navigation ? 853 : 1280}
                  alt="gallery"
                  onLoad={() => setLoaded(true)}
                  sizes="(max-width: 1025px) 100vw, 1280px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  {index > 0 && (
                    <button
                      className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      onClick={() => changePhotoId(index - 1)}
                    >
                      <HiChevronLeft className="h-6 w-6" />
                    </button>
                  )}
                  {index + 1 < images.length && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                      onClick={() => changePhotoId(index + 1)}
                    >
                      <HiChevronRight className="h-6 w-6" />
                    </button>
                  )}
                </>
              )}
              <div className="absolute top-0 right-0 flex items-center gap-2 p-3 text-white">
                {navigation ? (
                  <a
                    href={currentImage?.url}
                    className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                    target="_blank"
                    title="Open fullsize version"
                    rel="noreferrer"
                  >
                    <HiArrowTopRightOnSquare className="h-5 w-5" />
                  </a>
                ) : null}
              </div>
              <div className="absolute top-0 left-0 flex items-center gap-2 p-3 text-white">
                <button
                  onClick={closeModal}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  {navigation ? (
                    <HiXMark className="h-5 w-5" />
                  ) : (
                    <HiArrowUturnLeft className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        {navigation && (
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div
              initial={false}
              className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
            >
              <AnimatePresence initial={false}>
                {images.map(({ id, url }, idx) => (
                  <motion.button
                    initial={{
                      width: '0%',
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: id === images[index]?.id ? 1.25 : 1,
                      width: '100%',
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    key={id}
                    onClick={() => changePhotoId(idx)}
                    className={`${
                      id === images[index]?.id
                        ? 'z-20 rounded-md shadow shadow-black/50'
                        : 'z-10'
                    } ${id === 0 ? 'rounded-l-md' : ''} ${
                      id === images.length - 1 ? 'rounded-r-md' : ''
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <img
                      alt="small photos on the bottom"
                      width={180}
                      height={120}
                      className={`${
                        id === images[index]?.id
                          ? 'brightness-110 hover:brightness-110'
                          : 'brightness-50 contrast-125 hover:brightness-75'
                      } h-full transform object-cover transition`}
                      src={url || ''}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
