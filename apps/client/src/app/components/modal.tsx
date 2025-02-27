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
    <div className="relative w-full top-0 py-5 px-10 bg-slate-50">
      {children}
      {onClose && (
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-8 top-5"
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
    <div className="max-h-[50vh] bg-base-100 overflow-y-auto" {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, ...props }: ModalFooterProps) => {
  return (
    <div className="footer bottom-0 py-5 px-10 bg-slate-50" {...props}>
      {children}
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
