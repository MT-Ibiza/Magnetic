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
  const { images = [], autoplay, className, slidesToShow } = props;

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

  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU';

  const imagesToDisplay =
    images.length === 0 ? [{ url: defaultImage }] : images;

  return imagesToDisplay.length === 1 ? (
    <img
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '250px',
        // borderRadius: '1rem',
      }}
      className={className}
      loading="lazy"
      src={imagesToDisplay[0].url}
    />
  ) : (
    <Slider {...settings}>
      {imagesToDisplay.map((image, index) => (
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
