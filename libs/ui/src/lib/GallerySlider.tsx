import { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useId } from 'react';
import NextPrev from './NextPrev';
import { Image } from '@magnetic/interfaces';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';

export interface GallerySliderProps {
  className?: string;
  galleryImgs: Image[];
  ratioClass?: string;
  uniqueID: string;
  href?: string;
}

export const GallerySlider: FC<GallerySliderProps> = ({
  className = '',
  galleryImgs,
  ratioClass = 'aspect-w-4 aspect-h-3',
  uniqueID = 'uniqueID',
  href,
}) => {
  function useNcId(pre = 'nc'): string {
    const id = useId();
    return `${pre}_${id.replace(/:/g, '_')}`;
  }

  const UNIQUE_CLASS = `gallerySlider__${uniqueID}` + useNcId();

  const [glideInstance, setGlideInstance] = useState<any>(null);

  useEffect(() => {
    if (galleryImgs.length > 0) {
      const glide = new Glide(`.${UNIQUE_CLASS}`, {
        perView: 1,
        gap: 0,
        keyboard: false,
      });

      setGlideInstance(glide);

      glide.mount();

      return () => {
        glide.destroy();
      };
    }
  }, [galleryImgs, UNIQUE_CLASS]);

  const renderDots = () => {
    return (
      <div
        className="glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5"
        data-glide-el="controls[nav]"
      >
        {galleryImgs.map((_, i) => (
          <button
            className="glide__bullet w-1.5 h-1.5 rounded-full bg-neutral-300"
            key={i}
            data-glide-dir={`=${i}`}
          />
        ))}
      </div>
    );
  };

  const renderSliderGallery = () => {
    return (
      <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {galleryImgs.length > 0 ? (
              galleryImgs.map((item, index) => (
                <li key={index} className="glide__slide">
                  <Link to={href || ''} className={`block ${ratioClass}`}>
                    <img
                      className="w-full h-[250px] object-cover"
                      src={item.url}
                      alt={`Image ${index}`}
                    />
                  </Link>
                </li>
              ))
            ) : (
              <li className="glide__slide">
                <Link to={href || ''} className={`block ${ratioClass}`}>
                  <img
                    className="w-full h-[250px] object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
                    alt="Default Image"
                  />
                </Link>
              </li>
            )}
          </ul>
        </div>
        {galleryImgs.length > 1 && (
          <div className="absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-t from-neutral-900"></div>
        )}
        {galleryImgs.length > 1 && renderDots()}
        {galleryImgs.length > 1 && (
          <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-2 justify-between">
            <NextPrev
              className="w-full justify-between"
              btnClassName="w-8 h-8"
            />
          </div>
        )}
      </div>
    );
  };

  if (galleryImgs.length === 0) {
    return (
      <div
        className={`nc-GallerySlider ${className}`}
        data-nc-id="GallerySlider"
      >
        <div className={`${UNIQUE_CLASS} relative group overflow-hidden`}>
          <ul className="glide__slides">
            <li className="glide__slide">
              <Link to={href || ''} className={`block ${ratioClass}`}>
                <img
                  className="w-full h-[250px] object-cover"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU"
                  alt="Default Image"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={`nc-GallerySlider ${className}`} data-nc-id="GallerySlider">
      {renderSliderGallery()}
    </div>
  );
};

export default GallerySlider;
