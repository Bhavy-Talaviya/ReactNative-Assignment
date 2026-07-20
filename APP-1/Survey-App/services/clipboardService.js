import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (value) => {
  if (!value) return false;

  await Clipboard.setStringAsync(String(value));
  return true;
};
