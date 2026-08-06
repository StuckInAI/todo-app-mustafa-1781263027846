import { useEffect, useRef, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import clsx from 'clsx';
import { THEMES, type ThemeId } from '@/lib/themes';

type ThemeSwitcherProps = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

export default function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-3 py-2 text-sm font-medium text-[var(--app-text)] shadow-sm transition hover:border-[var(--app-accent)]"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Palette size={16} className="text-[var(--app-accent)]" />
        <span className="hidden sm:inline">{active.label}</span>
        <span
          className="h-4 w-4 rounded-full border border-black/10"
          style={{ backgroundColor: active.accent }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-1.5 shadow-xl"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="option"
              aria-selected={t.id === theme}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={clsx(
                'flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-medium transition',
                t.id === theme
                  ? 'bg-[var(--app-accent-soft)] text-[var(--app-accent)]'
                  : 'text-[var(--app-text)] hover:bg-[var(--app-soft)]'
              )}
            >
              <span
                className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-black/10"
                style={{ backgroundColor: t.surface }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: t.accent }}
                />
              </span>
              <span className="flex-1">{t.label}</span>
              {t.id === theme && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
