import { useState } from 'react';
import { Check, Trash2, Pencil, X, Save } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_STYLES = {
  low: 'border-l-4 border-l-[var(--p-low)]',
  medium: 'border-l-4 border-l-[var(--p-medium)]',
  high: 'border-l-4 border-l-[var(--p-high)]',
};

const PRIORITY_BADGE = {
  low: 'bg-[var(--p-low-bg)] text-[var(--p-low-text)]',
  medium: 'bg-[var(--p-medium-bg)] text-[var(--p-medium-text)]',
  high: 'bg-[var(--p-high-bg)] text-[var(--p-high-text)]',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(todo.id, editText);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  }

  return (
    <li
      className={clsx(
        'group flex items-center gap-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] px-4 py-3 shadow-sm transition hover:shadow-md',
        PRIORITY_STYLES[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition',
          todo.completed
            ? 'border-[var(--app-accent)] bg-[var(--app-accent)] text-[var(--app-accent-fg)]'
            : 'border-[var(--app-border)] hover:border-[var(--app-accent)]'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text or Edit Input */}
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[var(--app-accent)] bg-[var(--app-card)] px-2 py-1 text-sm text-[var(--app-text)] focus:ring-2 focus:ring-[var(--app-accent)] focus:outline-none"
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'truncate text-sm font-medium',
                todo.completed
                  ? 'text-[var(--app-muted)] line-through'
                  : 'text-[var(--app-text)]'
              )}
            >
              {todo.text}
            </span>
            <span
              className={clsx(
                'flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
                PRIORITY_BADGE[todo.priority]
              )}
            >
              {todo.priority}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-lg p-1.5 text-[var(--p-low-text)] transition hover:bg-[var(--app-soft)]"
              aria-label="Save"
            >
              <Save size={15} />
            </button>
            <button
              onClick={handleCancel}
              className="rounded-lg p-1.5 text-[var(--app-muted)] transition hover:bg-[var(--app-soft)]"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg p-1.5 text-[var(--app-accent)] transition hover:bg-[var(--app-accent-soft)]"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="rounded-lg p-1.5 text-[var(--p-high-text)] transition hover:bg-[var(--p-high-bg)]"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
