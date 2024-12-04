'use client';
import DrawerLib from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useEffect, useState } from 'react';
import './drawer.scss';
import Button from '../button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactElement;
  title?: string;
}
const Header = ({ text, onClose }: { text: string; onClose?: () => void }) => {
  return (
    <div className="px-6 mt-3">
      <div className="flex justify-between">
        <h5>{text}</h5>
        <div
          className="p-1 cursor-pointer hover:bg-gray-200 px-2"
          onClick={onClose && onClose}
        >
          <p className="font-bold">X</p>
        </div>
      </div>
    </div>
  );
};

const Body = ({ children }: { children: React.ReactElement }) => {
  return <div className="drawer-body p-6">{children}</div>;
};

const CancelButton = ({ onClose }: { onClose?: () => void }) => {
  return <Button onClick={onClose}> Cancel</Button>;
};

export function Drawer(props: Props) {
  const { isOpen, onClose, children, title } = props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DrawerLib
      open={isOpen}
      onClose={onClose}
      direction="right"
      style={{ minWidth: isMobile ? '100%' : '25rem' }}
    >
      {isOpen && <div className="h-full">{children}</div>}
    </DrawerLib>
  );
}

Drawer.Header = Header;
Drawer.CancelButton = CancelButton;
Drawer.Body = Body;
export default Drawer;
