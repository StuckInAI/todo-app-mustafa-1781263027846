import { CheckSquare } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-3 mb-2">
        <div className="bg-indigo-500 text-white p-2 rounded-xl shadow-lg">
          <CheckSquare size={28} />
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">My To-Do</h1>
      </div>
      <p className="text-gray-500 text-sm">Stay organized, get things done.</p>
    </div>
  );
}
