import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types';

type AddTodoFormProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITIES: { value: Priority; label: string; className: string }[] = [
  {
    value: 'low',
    label: 'Low',
    className: 'bg-[var(--p-low-bg)] text-[var(--p-low-text)] border-[var(--p-low)]',
  },
  {
    value: 'medium',
    label: 'Medium',
    className: 'bg-[var(--p-medium-bg)] text-[var(--p-medium-text)] border-[var(--p-medium)]',
  },
  {
    value: 'high',
    label: 'High',
    className: 'bg-[var(--p-high-bg)] text-[var(--p-high-text)] border-[var(--p-high)]',
  },
];

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] p-4 shadow-md"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-xl border border-[var(--app-border)] bg-[var(--app-card)] px-4 py-2 text-[var(--app-text)] placeholder-[var(--app-muted)] transition focus:ring-2 focus:ring-[var(--app-accent)] focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-[var(--app-accent)] px-4 py-2 font-semibold text-[var(--app-accent-fg)] shadow transition hover:bg-[var(--app-accent-hover)]"
        >
          <Plus size={18} />
          Add
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-[var(--app-muted)]">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={clsx(
              'rounded-full border px-3 py-1 text-xs font-semibold transition',
              p.className,
              priority === p.value
                ? 'scale-105 ring-2 ring-[var(--app-accent)] ring-offset-1 ring-offset-[var(--app-card)]'
                : 'opacity-60 hover:opacity-90'
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
    </form>
  );
}
