'use client';

import React, { useRef, useState } from 'react';

interface UploadImageProps {
  onChange: (file: File | null) => void;
  value?: string | null;
  height?: string;
  imageUrl?: string;
}

export const UploadImage: React.FC<UploadImageProps> = ({
  onChange,
  imageUrl,
  value = null,
  height = '15rem',
}) => {
  const [preview, setPreview] = useState<string | null | undefined>(imageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onChange(file);
    } else {
      setPreview(null);
      onChange(null);
    }
  };

  const handleSelectFileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onChange(file);
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {/* <span className="text-neutral-800 dark:text-neutral-200">
        Upload Image
      </span> */}
      <div
        className={`flex items-center rounded-[10px] justify-center w-full ${
          isDragging
            ? 'border-2 border-blue-500'
            : 'border-2 border-dashed border-gray-300'
        } transition-all ease-in-out duration-300 relative`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleContainerClick}
      >
        <label
          className="cursor-pointer rounded-[10px] flex flex-col rounded-lg w-full"
          style={{ height }}
        >
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover opacity-100 rounded-[10px]"
            />
          )}
          <div
            className={`absolute inset-0 flex items-center justify-center text-center ${
              preview ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-300`}
          >
            <p className="pointer-none text-gray-500">
              <span className="text-sm">Drag and drop</span> image here <br />{' '}
              or{' '}
              <span className="text-primary-600 hover:underline cursor-pointer">
                select a image
              </span>
            </p>
          </div>

          {preview && (
            <div className="absolute rounded-[10px] inset-0 flex items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
              <p className="pointer-none text-white">
                <span className="text-sm">Drag and drop</span> files here <br />{' '}
                or{' '}
                <span className="text-white hover:underline cursor-pointer">
                  select a image
                </span>
              </p>
            </div>
          )}
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden cursor-pointer"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadImage;
