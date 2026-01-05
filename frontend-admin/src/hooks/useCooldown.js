import { useState, useRef } from "react";

const useCooldown = (duration = 2000) => {
  const [cooldown, setCooldown] = useState(false);
  const timerRef = useRef();

  const trigger = () => {
    setCooldown(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCooldown(false), duration);
  };

  return [cooldown, trigger];
};

export default useCooldown;
