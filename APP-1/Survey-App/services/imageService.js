import * as FileSystem from 'expo-file-system';

export async function persistImageUri(uri) {
  if (!uri || uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri;
  }

  const extension = uri.split('.').pop()?.split('?')[0] || 'jpg';
  const destination = `${FileSystem.documentDirectory}image-${Date.now()}.${extension}`;

  await FileSystem.copyAsync({ from: uri, to: destination });
  return destination;
}
