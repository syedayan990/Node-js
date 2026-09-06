import { useEffect, useRef, useState } from "react";

const MAX_PULL = 60;
const TRIGGER_THRESHOLD = 40;

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [overlay, setOverlay] = useState({ visible: false, expanded: false, x: 0, y: 0, color: "#000" });
  const startYRef = useRef(0);
  const handleRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const triggerReveal = (x, y) => {
    const goingDark = !isDark;
    const color = goingDark ? "#000000" : "#f5f3ff";
    setOverlay({ visible: true, expanded: false, x, y, color });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlay((o) => ({ ...o, expanded: true }));
      });
    });
    setTimeout(() => {
      setIsDark(goingDark);
      setOverlay((o) => ({ ...o, visible: false, expanded: false }));
    }, 600);
  };

  const handlePointerDown = (e) => {
    setDragging(true);
    startYRef.current = e.clientY - pull;
    handleRef.current?.setPointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMove = (e) => {
      const next = Math.max(0, Math.min(MAX_PULL, e.clientY - startYRef.current));
      setPull(next);
    };
    const handleUp = () => {
      setDragging(false);
      if (pull >= TRIGGER_THRESHOLD && handleRef.current) {
        const rect = handleRef.current.getBoundingClientRect();
        triggerReveal(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
      setPull(0);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [dragging, pull]);

  return (
    <>
      {overlay.visible && (
        <div
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            backgroundColor: overlay.color,
            clipPath: `circle(${overlay.expanded ? "150%" : "0%"} at ${overlay.x}px ${overlay.y}px)`,
            transition: "clip-path 600ms cubic-bezier(0.65,0,0.35,1)",
          }}
        />
      )}

      <div
        className="absolute top-0 right-8 sm:right-10 flex flex-col items-center select-none z-10"
        style={{ touchAction: "none" }}
      >
        <div className="w-4 h-3 rounded-b-md bg-slate-400 dark:bg-slate-600" />
        <div
          className="w-0.5 bg-slate-400 dark:bg-slate-500"
          style={{
            height: `${30 + pull}px`,
            transition: dragging ? "none" : "height 450ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        />
        <button
          ref={handleRef}
          type="button"
          onPointerDown={handlePointerDown}
          aria-label="Pull the cord to toggle theme"
          className={`w-7 h-9 rounded-full border-2 flex items-center justify-center text-sm cursor-grab active:cursor-grabbing shadow-md ${
            isDark
              ? "bg-slate-800 border-slate-500 text-yellow-300"
              : "bg-white border-slate-300 text-amber-500"
          }`}
          style={{
            transition: dragging ? "none" : "transform 450ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          {isDark ? "🌙" : "☀️"}
        </button>
      </div>
    </>
  );
}
export default ThemeToggle;