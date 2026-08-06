import { useEffect, useState } from 'react';
import { DEFAULT_THEME, isThemeId, type ThemeId } from '@/lib/themes';

const STORAGE_KEY = 'todos-app-theme';

function loadTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return isThemeId(raw) ? raw : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(loadTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage failures — the theme still applies for this session.
    }
  }, [theme]);

  return { theme, setTheme };
}
