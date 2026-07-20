import * as ImagePicker from 'expo-image-picker';

export const requestCameraPermission = async () => {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  return permission.granted;
};

export const createPhotoRecord = (uri) => ({
  uri,
  capturedAt: new Date().toISOString(),
});
