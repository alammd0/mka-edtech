import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const ThumbnailUploader = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 6 * 1024 * 1024,
  });

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-richblack-5">
        Course Thumbnail <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className="flex flex-col items-center justify-center border border-dashed border-richblack-500 h-60 rounded-md cursor-pointer bg-richblack-700"
      >
        <input {...getInputProps()} />

        {preview ? (
          <img
            src={preview}
            alt="thumbnail preview"
            className="h-full w-full object-cover rounded-md"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-richblack-300">
            <FiUploadCloud size={30} className="text-yellow-50" />
            <p>
              Drag and drop an image, or{" "}
              <span className="text-yellow-100 underline">Browse</span>
            </p>
            <ul className="text-xs text-center text-richblack-400 mt-1">
              <li>Max 6MB</li>
              <li>Aspect ratio 16:9</li>
              <li>Recommended size: 1024x576</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailUploader;
