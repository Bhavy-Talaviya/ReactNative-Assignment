import { createContext, useEffect, useMemo, useState } from 'react';

import { getItem, saveItem } from '../services/storageService';
import colors from '../utils/colors';
import { STORAGE_KEYS } from '../utils/constants';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await getItem(STORAGE_KEYS.theme, false);
      setIsDark(Boolean(savedTheme));
      setIsThemeReady(true);
    };

    loadTheme();
  }, []);

  const setTheme = async (value) => {
    const nextValue = Boolean(value);
    setIsDark(nextValue);
    await saveItem(STORAGE_KEYS.theme, nextValue);
  };

  const value = useMemo(
    () => ({
      isDark,
      colors: isDark ? colors.dark : colors.light,
      isThemeReady,
      setTheme,
      toggleTheme: () => setTheme(!isDark),
    }),
    [isDark, isThemeReady],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
