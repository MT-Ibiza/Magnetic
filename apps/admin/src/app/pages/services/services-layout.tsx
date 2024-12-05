import { NavLink, Outlet } from 'react-router-dom';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { Fragment, useState } from 'react';

const routes = ['overview', 'products'];

export function ServiceLayout() {
  let path = location.pathname;
  const currentRoute = path.split('/').pop();
  const index = routes.indexOf(currentRoute || '');
  const [selectedIndexTab, setSelectedIndexTab] = useState(index);

  const linkClass =
    'dark:hover:border-b-black whitespace-nowrap -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary';
  const linkActiveClass =
    '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black';

  return (
    <>
      <div className="rental-property-page flex-1 bg-body rounded-lg shadow-md px-[0px] py-4 lg:p-8">
        <TabGroup selectedIndex={selectedIndexTab}>
          <div className="w-full overflow-hidden">
            <TabList className="overflow-x-scroll no-scrollbar mt-5 flex lg:flex-wrap border-b border-white-light dark:border-[#191e3a]">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <NavLink
                    to="overview"
                    onClick={() => {
                      setSelectedIndexTab(0);
                    }}
                    className={`${
                      selected ? linkActiveClass : ''
                    } ${linkClass}`}
                  >
                    Overview
                  </NavLink>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <NavLink
                    to="products"
                    onClick={() => {
                      setSelectedIndexTab(1);
                    }}
                    className={`${
                      selected ? linkActiveClass : ''
                    } ${linkClass}`}
                  >
                    Products
                  </NavLink>
                )}
              </Tab>
            </TabList>
          </div>
        </TabGroup>
        <Outlet />
      </div>
    </>
  );
}

export default ServiceLayout;
