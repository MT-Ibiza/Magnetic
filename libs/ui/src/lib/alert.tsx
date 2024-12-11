import React, { useEffect } from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'warning';
  onClose: () => void;
  duration?: number;
}

export function Alert({ message, type, onClose, duration = 3000 }: AlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeStyles = {
    success: 'bg-green-100 text-green-700 border-green-400',
    error: 'bg-red-100 text-red-700 border-red-400',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-400',
  };

  const iconComponents = {
    success: <FaCheckCircle className="h-5 w-5 text-green-700" />,
    error: <FaExclamationCircle className="h-5 w-5 text-red-700" />,
    warning: <FaExclamationTriangle className="h-5 w-5 text-yellow-700" />,
  };

  return (
    <div
      className={`alert fixed bottom-4 right-4 w-11/12 max-w-sm shadow-md z-50 flex items-center gap-3 p-3 border rounded-lg ${typeStyles[type]} animate-fade-in`}
      role="alert"
    >
      {iconComponents[type]}
      <span className="text-sm font-medium leading-tight">{message}</span>
    </div>
  );
}

export default Alert;
