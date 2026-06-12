import { CheckCircle2, Circle } from 'lucide-react';

type StatsBarProps = {
  activeCount: number;
  completedCount: number;
};

export default function StatsBar({ activeCount, completedCount }: StatsBarProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Circle size={15} className="text-indigo-400" />
            <span><strong>{activeCount}</strong> remaining</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <CheckCircle2 size={15} className="text-green-500" />
            <span><strong>{completedCount}</strong> done</span>
          </div>
        </div>
        <span className="text-sm font-bold text-indigo-500">{percent}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
