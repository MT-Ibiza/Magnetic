'use client';

import React, { useEffect, useState } from 'react';
import Drawer from './drawer/drawer';

interface Props {
  children: React.ReactNode;
  title: string;
  open: boolean;
  width?: string;
  onClose: () => void;
}

export function DrawerContent(props: Props) {
  const { children, title, open, onClose, width } = props;
  const [openDrawer, setOpenDrawer] = useState(open);
  const toggleDrawer = () => {
    setOpenDrawer((prevState) => !prevState);
    onClose();
  };

  useEffect(() => {
    setOpenDrawer(open);
  }, [open]);

  return (
    <Drawer isOpen={openDrawer} onClose={toggleDrawer} width={width}>
      <>
        <Drawer.Header text={title} onClose={toggleDrawer}></Drawer.Header>
        <Drawer.Body>
          <>{children}</>
        </Drawer.Body>
      </>
    </Drawer>
  );
}

export default DrawerContent;
