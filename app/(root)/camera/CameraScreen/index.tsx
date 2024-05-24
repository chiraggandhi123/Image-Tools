import React, { useEffect, useRef, useState } from 'react'
import {Camera, CameraType} from '../../../../components/shared/Camera';
import './index.scss';

const CameraScreen = ({setShowImage, setImage}:{setShowImage:(v:boolean)=>void, setImage:(i:string)=>void}) => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(0);
    useEffect(() => {
        (async () => {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter((i) => i.kind == 'videoinput');
          setDevices(videoDevices);
        })();
      });
  return (
    <div className='camera-wrapper'>
 <>

             <Camera
          ref={camera}
          aspectRatio='cover'
          numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          errorMessages={{
            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
            permissionDenied: 'Permission denied. Please refresh and give camera permission.',
            switchCamera:
              'It is not possible to switch camera to different one because there is only one video device accessible.',
            canvas: 'Canvas is not supported.',
          }}
          videoReadyCallback={() => {
            console.log('Video feed ready.');
          }}
        />
        <div className="control-section">
        <select
            className='select-button'
          onChange={(event) => {
            setActiveDeviceId(event.target.value);
          }}
        >
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label}
            </option>
          ))}
        </select>
         <div
          className='photo-button'
          onClick={() => {
            if (camera.current) {
              const photo = camera.current.takePhoto();
              setShowImage(true);
              setImage(photo);
            }
          }}
        />
          <div className='dummy-button'
          onClick={() => {
            if (camera.current) {
              const result = camera.current.switchCamera();
              console.log(result);
            }
          }}
        />
        </div>
      </>
    </div>
  )
}

export default CameraScreen
