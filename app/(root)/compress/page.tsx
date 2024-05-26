"use client";
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const CompressImage = () => {
    const [compressedImage, setCompressedImage] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const options = {
          maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
          maxWidthOrHeight: 800, // (default: undefined)
          useWebWorker: true // (default: true)
        };
    
        try {
          const compressedFile = await imageCompression(file, options);
    
          const compressedImageURL = URL.createObjectURL(compressedFile);
          setCompressedImage(compressedImageURL);
    
          console.log(`Original file size: ${file.size / 1024 / 1024} MB`);
          console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);
        } catch (error) {
          console.error('Error while compressing the image:', error);
        }
      };
  return (
    <div className='compress-image-wrapper'>
              <input type="file" accept="image/*" onChange={handleFileChange} />
       {compressedImage && (
        <div>
          <h3>Compressed Image:</h3>
          <img src={compressedImage} alt="Compressed" />
        </div>
      )}
    </div>
  )
}

export default CompressImage;
