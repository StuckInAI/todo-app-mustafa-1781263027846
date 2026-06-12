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

export default function FilterBar({ filter, setFilter, onClearCompleted, completedCount }: FilterBarProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-1 bg-white rounded-xl shadow-sm p-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-4 py-1.5 rounded-lg text-sm font-medium transition',
              filter === f.value
                ? 'bg-indigo-500 text-white shadow'
                : 'text-gray-500 hover:text-indigo-500'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition font-medium"
        >
          <Trash2 size={14} />
          Clear done ({completedCount})
        </button>
      )}
    </div>
  );
}
