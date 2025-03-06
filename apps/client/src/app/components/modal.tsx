import React, { useEffect, useState } from 'react';

interface Props {
  id?: string;
  open: boolean;
  children: React.ReactNode;
}

interface ModalFooterProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

function Modal(props: Props) {
  const { id, open, children } = props;
  const [openContent, setOpenContent] = useState(open);
  const modalId = id ? id : 'modal-magnetic';

  useEffect(() => {
    if (open) {
      openForm();
    } else {
      closeForm();
    }
  }, [open]);

  const openForm = () => {
    setOpenContent(true);
    //@ts-ignore
    document.getElementById(modalId).showModal();
  };

  const closeForm = () => {
    setOpenContent(false);
    //@ts-ignore
    document.getElementById(modalId).close();
  };

  return (
    <dialog id={id ? id : 'modal-magnetic'} className="modal">
      <div className="p-8 w-full max-w-5xl">
        {openContent && <div className="relative">{children}</div>}
      </div>
    </dialog>
  );
}

const Header = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <div className="rounded-t-[10px] text-lg font-medium leading-6 text-gray-900 relative w-full top-0 py-5 px-10 bg-white border-b border-neutral-200">
      {children}
      {onClose && (
        <button
          className="hover:bg-neutral-100 btn btn-sm btn-circle btn-ghost absolute right-8 top-5"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};

const Body = ({ children, ...props }: ModalFooterProps) => {
  return (
    <div className="max-h-[60vh] bg-base-100 overflow-y-auto" {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, ...props }: ModalFooterProps) => {
  return (
    <div
      className="rounded-b-[10px] py-5 px-10 flex-shrink-0 bg-neutral-50 flex items-center justify-between border-t border-neutral-200"
      {...props}
    >
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
