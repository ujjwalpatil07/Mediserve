import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TypingText = ({ text, speed = 100, hero }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <motion.h2
      className={` ${hero ? "text-start max-w-4xl text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3) text-4xl font-bold text-cyan-950 md:text-6xl lg:text-7xl" : "text-2xl font-mono"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {displayedText}
      <span className="animate-pulse">|</span>
    </motion.h2>
  );
};

export default TypingText;
