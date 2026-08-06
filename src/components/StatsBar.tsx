import { CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="mb-4 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-[var(--app-muted)]">
            <Circle size={15} className="text-[var(--app-accent)]" />
            <span>
              <strong className="text-[var(--app-text)]">{activeCount}</strong> remaining
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-[var(--app-muted)]">
            <CheckCircle2 size={15} className="text-[var(--p-low)]" />
            <span>
              <strong className="text-[var(--app-text)]">{completedCount}</strong> done
            </span>
          </div>
        </div>
        <span className="text-sm font-bold text-[var(--app-accent)]">{percent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-[var(--app-soft)]">
        <div
          className="h-2 rounded-full bg-[var(--app-accent)] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
