import { useCallback, useEffect, useRef, useState } from 'react';

import { createPhotoRecord, requestCameraPermission } from '../services/cameraService';

export const useCamera = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const requestPermission = useCallback(async () => {
    const granted = await requestCameraPermission();
    setHasPermission(granted);
    return granted;
  }, []);

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const capturePhoto = useCallback(async () => {
    if (!cameraRef.current || !isCameraReady) return null;

    setIsCapturing(true);
    try {
      const result = await cameraRef.current.takePictureAsync({ quality: 0.7 });
      const capturedPhoto = createPhotoRecord(result.uri);
      setPhoto(capturedPhoto);
      return capturedPhoto;
    } finally {
      setIsCapturing(false);
    }
  }, [isCameraReady]);

  const retakePhoto = useCallback(() => setPhoto(null), []);
  const deletePhoto = useCallback(() => setPhoto(null), []);

  return {
    cameraRef,
    hasPermission,
    isCameraReady,
    isCapturing,
    photo,
    requestPermission,
    capturePhoto,
    retakePhoto,
    deletePhoto,
    setIsCameraReady,
  };
};
