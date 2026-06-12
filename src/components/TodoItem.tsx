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
  low: 'border-l-4 border-green-400',
  medium: 'border-l-4 border-yellow-400',
  high: 'border-l-4 border-red-400',
};

const PRIORITY_BADGE = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
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
        'bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3 group transition hover:shadow-md',
        PRIORITY_STYLES[todo.priority]
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-gray-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={13} strokeWidth={3} />}
      </button>

      {/* Text or Edit Input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full border border-indigo-300 rounded-lg px-2 py-1 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        ) : (
          <div className="flex items-center gap-2">
            <span
              className={clsx(
                'text-sm font-medium truncate',
                todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
              )}
            >
              {todo.text}
            </span>
            <span
              className={clsx(
                'text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0',
                PRIORITY_BADGE[todo.priority]
              )}
            >
              {todo.priority}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg text-green-500 hover:bg-green-50 transition"
              aria-label="Save"
            >
              <Save size={15} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 rounded-lg text-indigo-400 hover:bg-indigo-50 transition"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition"
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
