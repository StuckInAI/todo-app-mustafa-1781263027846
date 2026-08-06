import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import type { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
  completedCount: number;
};

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  onClearCompleted,
  completedCount,
}: FilterBarProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex gap-1 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] p-1 shadow-sm">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'rounded-lg px-4 py-1.5 text-sm font-medium transition',
              filter === f.value
                ? 'bg-[var(--app-accent)] text-[var(--app-accent-fg)] shadow'
                : 'text-[var(--app-muted)] hover:text-[var(--app-accent)]'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1 text-xs font-medium text-[var(--p-high-text)] transition hover:opacity-70"
        >
          <Trash2 size={14} />
          Clear done ({completedCount})
        </button>
      )}
    </div>
  );
}
