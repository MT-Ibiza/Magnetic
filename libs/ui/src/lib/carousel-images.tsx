'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@magnetic/interfaces';

export interface CardProps {
  images: Image[];
  autoplay?: boolean;
  className?: string;
  slidesToShow?: number;
  ratio1?: number;
  ratio2?: number;
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        right: '5px',
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        left: '5px',
        zIndex: '10',
      }}
      onClick={onClick}
    />
  );
}

export function CarouselImages(props: CardProps) {
  const {
    images = [],
    autoplay,
    className,
    slidesToShow,
    ratio1 = 9,
    ratio2 = 6,
  } = props;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    arrows: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const ratio = ratio1 / ratio2;

  return images.length === 1 ? (
      <img
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '250px',
          // borderRadius: '1rem',
        }}
        className={className}
        loading="lazy"
        src={images[0].url}
      />
  ) : (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
            <img
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '250px',
                // borderRadius: '1rem',
              }}
              className={className}
              loading="lazy"
              src={image.url}
            />
        </div>
      ))}
    </Slider>
  );
}

export default CarouselImages;
