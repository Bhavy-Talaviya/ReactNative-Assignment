import { useCallback, useEffect, useRef, useState } from 'react';

import { copyToClipboard } from '../services/clipboardService';

export const useClipboard = () => {
  const timeoutRef = useRef(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(async (value, successMessage = 'Copied to clipboard') => {
    const copied = await copyToClipboard(value);
    if (!copied) return false;

    setToastMessage(successMessage);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToastMessage(''), 2500);
    return true;
  }, []);

  return {
    toastMessage,
    copy,
    clearToast: () => setToastMessage(''),
  };
};
