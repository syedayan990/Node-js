import { useContext, useEffect, useRef, useState } from "react";
import { MdDeleteSweep, MdDragIndicator } from "react-icons/md";
import storeItemsContext from "../store/storeItemsContext";
import useSound from "../hooks/useSound";

function TodoItem({
  id,
  TodoName,
  TodoDate,
  Completed,
  draggable,
  onDragStartItem,
  onDragOverItem,
  onDragEndItem,
  isDragging,
}) {
  const { DeleteItem, ToggleComplete } = useContext(storeItemsContext);
  const { playDelete, playComplete } = useSound();
  const cardRef = useRef(null);

  const [entered, setEntered] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const touchStartX = useRef(0);
  const isTouching = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 10);
    return () => clearTimeout(t);
  }, []);

  const formattedDate = TodoDate
    ? new Date(TodoDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const startRemove = () => {
    playDelete();
    setRemoving(true);
    setTimeout(() => DeleteItem(id), 280);
  };

  const handleToggle = () => {
    if (!Completed) playComplete();
    ToggleComplete(id);
  };

  const handleTouchStart = (e) => {
    isTouching.current = true;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (!isTouching.current) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (delta < 0) setSwipeX(delta);
  };
  const handleTouchEnd = () => {
    isTouching.current = false;
    if (swipeX < -90) {
      setSwipeX(-400);
      startRemove();
    } else {
      setSwipeX(0);
    }
  };

  const handleHandleDragStart = (e) => {
    if (cardRef.current) {
      e.dataTransfer.setDragImage(cardRef.current, 20, 20);
    }
    onDragStartItem();
  };

  return (
    <div
      ref={cardRef}
      onDragOver={onDragOverItem}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="glow-fill"
      style={{
        opacity: removing ? 0 : entered ? 1 : 0,
        transform: `translateX(${swipeX}px) ${
          removing
            ? "scale(0.9)"
            : entered
              ? "translateY(0)"
              : "translateY(-10px)"
        }`,
        transition: isTouching.current
          ? "none"
          : "opacity 280ms ease, transform 280ms ease, max-height 280ms ease",
        maxHeight: removing ? "0px" : "200px",
        overflow: "hidden",
      }}
    >
      <div
        className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${
          Completed
            ? "bg-slate-50/90 dark:bg-slate-900/80"
            : "bg-white/90 dark:bg-black/80"
        } ${isDragging ? "opacity-40" : ""}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {draggable && (
            <span
              draggable
              onDragStart={handleHandleDragStart}
              onDragEnd={onDragEndItem}
              className="text-slate-300 dark:text-slate-600 cursor-grab active:cursor-grabbing shrink-0 hidden sm:flex"
            >
              <MdDragIndicator size={18} />
            </span>
          )}
          <input
            type="checkbox"
            checked={!!Completed}
            onChange={handleToggle}
            className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500 shrink-0 cursor-pointer"
          />
          <div className="min-w-0">
            <p
              className={`font-medium truncate ${Completed ? "line-through text-slate-400 dark:text-slate-600" : "text-slate-800 dark:text-white"}`}
            >
              {TodoName}
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              {formattedDate}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={startRemove}
          className="shrink-0 rounded-full p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
          aria-label="Delete todo"
        >
          <MdDeleteSweep size={22} />
        </button>
      </div>
    </div>
  );
}
export default TodoItem;
