import { useContext } from "react";
import storeItemsContext from "../store/storeItemsContext";

function StatsDashboard() {
  const { todoItems } = useContext(storeItemsContext);
  const total = todoItems.length;
  const completed = todoItems.filter((i) => i.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex sm:flex-col items-center gap-4 sm:gap-3">
      <div className="relative w-20 h-20 shrink-0">
        <svg className="w-20 h-20 -rotate-90">
          <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="6" fill="none" className="text-slate-100 dark:text-slate-800" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-indigo-600 dark:text-indigo-400 transition-all duration-500"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-700 dark:text-white">
          {percent}%
        </span>
      </div>

      <div className="flex sm:flex-col gap-2 flex-1 sm:w-full">
        <div className="flex-1 sm:flex-none rounded-lg bg-slate-50 dark:bg-slate-900 px-3 py-2 text-center sm:text-left">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-lg font-bold text-slate-800 dark:text-white">{total}</p>
        </div>
        <div className="flex-1 sm:flex-none rounded-lg bg-emerald-50 dark:bg-emerald-950 px-3 py-2 text-center sm:text-left">
          <p className="text-xs text-emerald-500">Completed</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{completed}</p>
        </div>
        <div className="flex-1 sm:flex-none rounded-lg bg-amber-50 dark:bg-amber-950 px-3 py-2 text-center sm:text-left">
          <p className="text-xs text-amber-500">Pending</p>
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{pending}</p>
        </div>
      </div>
    </div>
  );
}
export default StatsDashboard;