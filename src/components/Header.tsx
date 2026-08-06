import { CheckSquare } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import type { ThemeId } from '@/lib/themes';

type HeaderProps = {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
};

export default function Header({ theme, setTheme }: HeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[var(--app-accent)] p-2 text-[var(--app-accent-fg)] shadow-lg">
            <CheckSquare size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[var(--app-text)] sm:text-4xl">
              My To-Do
            </h1>
            <p className="text-sm text-[var(--app-muted)]">Stay organized, get things done.</p>
          </div>
        </div>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
