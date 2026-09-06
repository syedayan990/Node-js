import { useContext } from "react";
import storeItemsContext from "../store/storeItemsContext";

const tabs = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" },
];

function FilterTabs() {
  const { filter, setFilter } = useContext(storeItemsContext);
  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => setFilter(tab.key)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            filter === tab.key
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
export default FilterTabs;