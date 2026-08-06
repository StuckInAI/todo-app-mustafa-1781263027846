export type ThemeId =
  | 'indigo'
  | 'midnight'
  | 'emerald'
  | 'sunset'
  | 'rose'
  | 'ocean'
  | 'graphite';

export type ThemeOption = {
  id: ThemeId;
  label: string;
  /** Swatch colors shown in the theme picker: [accent, surface]. */
  accent: string;
  surface: string;
};

export const THEMES: ThemeOption[] = [
  { id: 'indigo', label: 'Indigo', accent: '#6366f1', surface: '#eef2ff' },
  { id: 'midnight', label: 'Midnight', accent: '#818cf8', surface: '#1e293b' },
  { id: 'emerald', label: 'Emerald', accent: '#10b981', surface: '#ecfdf5' },
  { id: 'sunset', label: 'Sunset', accent: '#f97316', surface: '#fff7ed' },
  { id: 'rose', label: 'Rose', accent: '#ec4899', surface: '#fff1f2' },
  { id: 'ocean', label: 'Ocean', accent: '#0891b2', surface: '#ecfeff' },
  { id: 'graphite', label: 'Graphite', accent: '#fbbf24', surface: '#27272a' },
];

export const DEFAULT_THEME: ThemeId = 'indigo';

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && THEMES.some((t) => t.id === value);
}
