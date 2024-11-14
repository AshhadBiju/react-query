import React from "react";

interface Image {
  path: string;
  caption: string;
}

interface ImagePickerProps {
  images: Image[]; // Array of images, each with path and caption
  selectedImage?: string; // Path of the selected image (optional)
  onSelect: (imagePath: string) => void; // Callback when an image is selected
}

export default function ImagePicker({
  images,
  selectedImage,
  onSelect,
}: ImagePickerProps) {
  return (
    <div id="image-picker">
      <p>Select an image</p>
      <ul>
        {images.map((image) => (
          <li
            key={image.path}
            onClick={() => onSelect(image.path)}
            className={selectedImage === image.path ? "selected" : undefined}
          >
            <img
              src={`http://localhost:3000/${image.path}`}
              alt={image.caption}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
