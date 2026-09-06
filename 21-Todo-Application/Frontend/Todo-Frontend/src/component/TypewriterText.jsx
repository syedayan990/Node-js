import { useEffect, useState } from "react";

function TypewriterText({
  text,
  className = "",
  typingSpeed = 150,
  deletingSpeed = 75,
  pauseAfterType = 2500,
  pauseAfterDelete = 700,
}) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | deleting

  useEffect(() => {
    let timeout;

    if (phase === "typing") {
      if (display.length < text.length) {
        timeout = setTimeout(() => {
          setDisplay(text.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(text.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("typing"), pauseAfterDelete);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, text, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete]);

  return (
    <span className={className}>
      {display}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}
export default TypewriterText;