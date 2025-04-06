import { HiChevronDown } from "react-icons/hi";
import React, { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export interface MegamenuItem {
  id: string;
  image: string;
  title: string;
}
export interface NavItemType {
  id: string;
  name: string;
  isNew?: boolean;
  href?: string;
  targetBlank?: boolean;
  onClick?: () => void;
  children?: NavItemType[];
  megaMenu?: MegamenuItem[];
  type?: "dropdown" | "megaMenu" | "none";
}

export interface NavigationItemProps {
  menuItem: NavItemType;
}

type NavigationItemWithRouterProps = NavigationItemProps;

const NavigationItem: FC<NavigationItemWithRouterProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  const locationPathName = useLocation().pathname;
  useEffect(() => {
    setMenuCurrentHovers([]);
  }, [locationPathName]);

  const renderMainItem = (item: NavItemType) => (
    <NavLink
      end
      target={item.targetBlank ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      to={item.href || "/"}
    >
      {item.name}
      {item.type && <HiChevronDown className="ml-1 -mr-1 h-4 w-4 text-neutral-400" />}
    </NavLink>
  );

  switch (menuItem.type) {
    default:
      return <li className="menu-item">{renderMainItem(menuItem)}</li>;
  }
};

export default NavigationItem;
