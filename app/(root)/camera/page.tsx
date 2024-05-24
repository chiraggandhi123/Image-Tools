"use client";
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import CameraScreen from './CameraScreen';
import Preview from './PreviewScreen';


const App = () => {
  const [image, setImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);



  return (
    <>
      {showImage ? (
        <Preview image={image} setShowImage={setShowImage} showImage={showImage}/>
      ) : (
        <CameraScreen setImage={setImage} setShowImage={setShowImage} />
      )}
    </>
  );
};

export default App;
