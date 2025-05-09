import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import isInViewport from '../utils';
import MenuBar from './menu-bar-mobile';
import { useCartStore } from '../hooks/useCartStore';
import {
  HiOutlineBell,
  HiOutlineChartPie,
  HiOutlineShoppingCart,
  HiOutlineHome,
} from 'react-icons/hi';
import { useGuestCartStore } from '../hooks/useGuestCartStore';

let WIN_PREV_POSITION = window.pageYOffset;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

const NAV = [
  { name: 'Dashboard', link: '/dashboard', icon: HiOutlineChartPie },
  { name: 'Services', link: '/services', icon: HiOutlineBell },
  {
    name: 'Cart',
    link: '/checkout',
    icon: HiOutlineShoppingCart,
    showCounter: true,
  },
  { name: 'Menu', icon: MenuBar },
];

const GUEST_NAV = [
  { name: 'Cart', link: '/checkout', icon: HiOutlineShoppingCart },
];

const FooterNav = ({
  guestMode,
  cartLink,
}: {
  guestMode?: boolean;
  cartLink?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { cart } = guestMode ? useGuestCartStore() : useCartStore();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigationMenu = guestMode
    ? [
        {
          name: 'Home',
          link: `${cartLink}`,
          icon: HiOutlineHome,
        },
        {
          name: 'Cart',
          link: `${cartLink}/checkout`,
          icon: HiOutlineShoppingCart,
          showCounter: true,
        },
      ]
    : NAV;

  useEffect(() => {
    window.addEventListener('scroll', handleEvent);
    return () => {
      window.removeEventListener('scroll', handleEvent);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(showHideHeaderMenu);
  };

  const showHideHeaderMenu = () => {
    const currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;
    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        containerRef.current?.classList.add('FooterNav--hide');
      }, 1000);
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      if (hideTimeout) clearTimeout(hideTimeout);
      containerRef.current.classList.remove('FooterNav--hide');
    }
    WIN_PREV_POSITION = currentScrollPos;
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block md:hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700
        transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {navigationMenu.map((item, index) => {
          const active = location.pathname === item.link;
          return item.link ? (
            <Link
              key={index}
              to={item.link}
              className={`relative flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? 'text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <item.icon
                className={`w-5 h-5 ${active ? 'text-primary-600' : ''}`}
              />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
              {item.showCounter && totalItems > 0 && (
                <div className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg">
                  {totalItems}
                </div>
              )}
            </Link>
          ) : (
            <div
              key={index}
              className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                active ? 'text-neutral-900 dark:text-neutral-100' : ''
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[11px] leading-none mt-1">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterNav;
