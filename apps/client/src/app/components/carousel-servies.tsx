import React, { useEffect, useMemo } from 'react';
import Glide from '@glidejs/glide';
import { useId } from 'react';
import { Service } from '@magnetic/interfaces';
import ServiceCard from './services/service-card';
import { Heading, NextPrev } from '@magnetic/ui';
import '@glidejs/glide/dist/css/glide.core.min.css';
import { Link } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  uniqueClassName?: string;
  itemPerRow: number;
  subHeading?: string;
  sliderStyle?: 'style1' | 'style2';
  services: Service[];
  itemClassName?: string;
}

function useNcId(pre = 'nc'): string {
  const id = useId();
  return `${pre}_${id.replace(/:/g, '_')}`;
}

export function CarouselServices(props: Props) {
  const {
    children,
    title,
    className,
    uniqueClassName,
    itemPerRow,
    subHeading,
    sliderStyle,
    services,
    itemClassName,
  } = props;

  const UNIQUE_CLASS =
    'SectionSliderNewCategories__' + uniqueClassName + useNcId();

  let MY_GLIDEJS = useMemo(() => {
    return new Glide(`.${UNIQUE_CLASS}`, {
      perView: itemPerRow,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: itemPerRow - 1,
        },
        1024: {
          gap: 20,
          perView: itemPerRow - 1,
        },
        768: {
          gap: 20,
          perView: itemPerRow - 2,
        },
        640: {
          gap: 20,
          perView: itemPerRow - 3,
        },
        500: {
          gap: 20,
          perView: 1.3,
        },
      },
    });
  }, [UNIQUE_CLASS]);

  useEffect(() => {
    setTimeout(() => {
      MY_GLIDEJS.mount();
    }, 100);
  }, [MY_GLIDEJS, UNIQUE_CLASS]);

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      <div className={`${UNIQUE_CLASS} flow-root`}>
        <Heading
          desc={subHeading}
          hasNextPrev={sliderStyle === 'style1'}
          isCenter={sliderStyle === 'style2'}
        >
          {title}
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {services.map((service, index) => (
              <Link to={`/services/${service.id}`} key={index}>
                <li className={`glide__slide ${itemClassName}`}>
                  <ServiceCard service={service} />
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {sliderStyle === 'style2' && (
          <NextPrev className="justify-center mt-16" />
        )}
      </div>
    </div>
  );
}

export default CarouselServices;
