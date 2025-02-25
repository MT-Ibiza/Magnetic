import { FaChartPie, FaConciergeBell, FaBox, FaShoppingCart } from 'react-icons/fa';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import isInViewport from '../utils';
import MenuBar from './menu-bar-mobile';
import { useCartStore } from '../hooks/useCartStore';

let WIN_PREV_POSITION = window.pageYOffset;

interface NavItem {
  name: string;
  link?: string;
  icon: any;
}

const NAV: NavItem[] = [
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: FaChartPie,
  },
  {
    name: 'Services',
    link: '/services',
    icon: FaConciergeBell,
  },
  {
    name: 'Cart',
    link: '/cart',
    icon: FaShoppingCart,
  },
  {
    name: 'Menu',
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { cart } = useCartStore();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  useEffect(() => {
    window.addEventListener('scroll', handleEvent);
  }, []);

  const handleEvent = () => {
    window.requestAnimationFrame(showHideHeaderMenu);
  };

  const showHideHeaderMenu = () => {
    let currentScrollPos = window.pageYOffset;
    if (!containerRef.current) return;

    if (currentScrollPos > WIN_PREV_POSITION) {
      if (
        isInViewport(containerRef.current) &&
        currentScrollPos - WIN_PREV_POSITION < 80
      ) {
        return;
      }

      containerRef.current.classList.add('FooterNav--hide');
    } else {
      if (
        !isInViewport(containerRef.current) &&
        WIN_PREV_POSITION - currentScrollPos < 80
      ) {
        return;
      }
      containerRef.current.classList.remove('FooterNav--hide');
    }

    WIN_PREV_POSITION = currentScrollPos;
  };

  return (
    <div
      ref={containerRef}
      className="FooterNav block lg:hidden p-2 bg-white dark:bg-neutral-800 fixed top-auto bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700 
        transition-transform duration-300 ease-in-out"
    >
      <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
        {NAV.map((item, index) => {
          const active = location.pathname === item.link;
          return item.link ? (
            <Link
            key={index}
            to={item.link}
            className={`relative flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
              active ? 'text-neutral-900 dark:text-neutral-100' : ''
            }`}
          >
            <item.icon className={`w-6 h-6 ${active ? 'text-red-600' : ''}`} />
            <span className="text-[11px] leading-none mt-1">{item.name}</span>
            {item.link === '/cart' && totalItems > 0 && (
              <div
                className="absolute -top-1 -right-3 bg-red-600 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg"
              >
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
