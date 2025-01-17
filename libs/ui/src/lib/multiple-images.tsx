import { Image } from '@magnetic/interfaces';
import { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';

interface UploadMultipleImagesProps {
  images: File[];
  existingImages?: Image[];
  onChange: (files: File[]) => void;
  onRemoveExistingImage?: (url: string) => void;
  height?: string;
}

export const UploadMultipleImages = ({
  images,
  existingImages = [],
  onChange,
  onRemoveExistingImage,
  height = '200px',
}: UploadMultipleImagesProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(images);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const updatedFiles = [...selectedFiles, ...fileArray];
      setSelectedFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = selectedFiles.filter((file) => file !== fileToRemove);
    setSelectedFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      const updatedFiles = [...selectedFiles, ...fileArray];
      setSelectedFiles(updatedFiles);
      onChange(updatedFiles);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-3">
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative group">
            <img
              src={image.url}
              alt={`Existing ${index}`}
              className="object-cover w-full h-[200px] rounded-md"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
        {selectedFiles.map((file, index) => (
          <div key={`new-${index}`} className="relative group">
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index}`}
              className="object-cover w-full h-[200px] rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveFile(file)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center border-2 rounded-md transition-all ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-dashed border-gray-300'
        }`}
        style={{ height }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="upload-input"
        />
        <label
          htmlFor="upload-input"
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <div className="flex flex-col items-center space-y-2">
            <FaCloudUploadAlt className="text-4xl text-gray-400" />
            <span>Click to upload images</span>
            <span className="text-sm text-gray-400">or drag them here</span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default UploadMultipleImages;
