import { useState, useEffect } from 'react';

interface UploadMultipleImagesProps {
  images: File[];
  onChange: (files: File[]) => void;
  height?: string;
}

export const UploadMultipleImages = ({
  images,
  onChange,
  height,
}: UploadMultipleImagesProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(images);

  useEffect(() => {
    setSelectedFiles(images);
  }, [images]);

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

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {selectedFiles.map((file, index) => (
          <div key={index} className="relative w-32 h-32">
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index}`}
              className="object-cover w-full h-full rounded-md"
              style={{ height: height || 'auto' }}
            />
            <button
              type="button"
              onClick={() => handleRemoveFile(file)}
              className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="block w-full py-2 px-4 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

export default UploadMultipleImages;
